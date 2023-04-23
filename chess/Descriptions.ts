import { Color } from "./Color";
import { EvaluatedPosition, MoveAndEvaluation } from "./EvaluatedPosition";
import { Evaluation } from "./Evaluation";
import { Move } from "./Move";

// What features will we use to interpret the move
//
// Total number of moves
// Is top move
// Number of better moves
// Number of moves within 0.5 of the top move
// Number of moves within 0.5 of the played move
// Does the move maintain the advantage (score > 0)
// Number of moves that maintain advantage (score > 0)
// Is there a forced mate for player
// Is there a forced mate for opponent
// Is move forced mate for player
// Is move forced mate for opponent
// Number of moves that are mate for player
// Number of moves that are mate for opponent
// Is the current position a draw*
// Does the move result in a draw*
//

export interface MoveDescription {
  isBestMove: boolean;
  isGoodMove: boolean;
  maintainsAdvantage: boolean | null;
  moveIndex: number | null;

  moveIsForcedMateForPlayer: boolean;
  moveIsForcedMateForOpponent: boolean;
  maintainsForcedMateFor: boolean | null;
  blundersForcedMateAgainst: boolean | null;
  maintainsForcedMateAgainst: boolean | null;

  moveScore: number | null;
  scoreDelta: number | null;
  isDraw: boolean;
  maintainsDraw: boolean | null;
}

export interface PositionDescription {
  numGoodMoves: number;
  numMateForMoves: number;
  numMovesMaintainAdvantage: number;
}

const findMatchingMoveIdx = (
  moves: MoveAndEvaluation[],
  move: Move
): number | null => {
  for (const idx in moves) {
    const currentMove = moves[idx].move;
    if (
      currentMove.from === move.from &&
      currentMove.to === move.to &&
      currentMove?.promotion === move?.promotion
    ) {
      return parseInt(idx);
    }
  }
  return null;
};

export const getColorIndependentScore = (
  color: Color,
  score: number
): number => {
  const colorFactor = color === "w" ? 1 : -1;
  return score * colorFactor;
};

export const doesMaintainForcedMateFor = (
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): boolean | null => {
  if (positionEvaluation?.forced_mate?.for !== "PLAYER") {
    return null;
  } else {
    return moveEvaluation?.forced_mate?.for === "PLAYER";
  }
};

export const doesMaintainForcedMateAgainst = (
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): boolean | null => {
  if (positionEvaluation?.forced_mate?.for === "OPPONENT") {
    return moveEvaluation?.forced_mate?.for === "OPPONENT";
  } else {
    return null;
  }
};

export const doesBlunderForcedMateAgainst = (
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): boolean => {
  return (
    positionEvaluation?.forced_mate?.for !== "OPPONENT" &&
    moveEvaluation?.forced_mate?.for === "OPPONENT"
  );
};

export const doesMaintainAdvantage = (
  turn: Color,
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): boolean => {
  if (
    doesMaintainForcedMateAgainst(moveEvaluation, positionEvaluation) ||
    doesBlunderForcedMateAgainst(moveEvaluation, positionEvaluation)
  ) {
    return false;
  }
  if (moveEvaluation?.forced_mate?.for === "PLAYER") {
    return true;
  }
  return (
    moveEvaluation?.score != null &&
    getColorIndependentScore(turn, moveEvaluation.score) > 0
  );
};

export const doesMaintainDraw = (
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): boolean | null => {
  if (positionEvaluation?.score === 0) {
    return moveEvaluation?.score === 0;
  } else {
    return null;
  }
};

export const getMoveScoreDelta = (
  turn: Color,
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation
): number | null => {
  const colorFactor = turn === "w" ? 1 : -1;
  if (positionEvaluation.score != null && moveEvaluation.score != null) {
    return (
      colorFactor * positionEvaluation.score -
      colorFactor * moveEvaluation.score
    );
  } else {
    return null;
  }
};

/*
// scoreThreshold: If the resulting score is greater than this threshold, we say the
//   move always maintains advantage (regardless of the delta).
// scoreDifferenceThreshold: The maximum difference in score allowed (in centipawns)
// mateToScoreThreshold: We consider the advantage maintained if it's forced mate
//   but you make a move that still has at least a 'mateToScoreThreshold' advantage
//   in centipawns.

const maintainsEvaluation = (color: Color, evaluation: Evaluation, referenceEvaluation: Evaluation,
    scoreThreshold: number, scoreDifferenceThreshold: number, mateToScoreThreshold: number): boolean => {

    const color_factor = (color === 'w') ? 1 : -1;

    // If it's already mate (the game is over), then we return true
    if (referenceEvaluation.mate != null) {
        return true;
    }

    // If it's already forced mate against, we consider any move as
    // maintaining the advantage
    if (referenceEvaluation?.forced_mate?.for === "OPPONENT") {
        return true;
    }

    if (referenceEvaluation?.forced_mate?.for === "PLAYER") {
        if (evaluation?.forced_mate?.for === "PLAYER") {
            return true;
        } else if (evaluation?.forced_mate?.for === 'OPPONENT') {
            return false;
        } else if (evaluation.score != null && color_factor * evaluation.score > mateToScoreThreshold) {
            return true;
        } else {
            return false;
        }
    }

    if (evaluation.score != null && color_factor * evaluation.score >= scoreThreshold) {
        return true;
    }

    if (evaluation.score != null && referenceEvaluation.score != null) {
        return color_factor * evaluation.score >= color_factor * referenceEvaluation.score - scoreDifferenceThreshold;
    }

    return false;
}
*/

export const isGoodMove = (
  turn: Color,
  moveEvaluation: Evaluation,
  positionEvaluation: Evaluation,
  scoreThreshold: number,
  scoreDropThreshold: number
): boolean => {
  if (
    doesMaintainForcedMateAgainst(moveEvaluation, positionEvaluation) ||
    doesBlunderForcedMateAgainst(moveEvaluation, positionEvaluation)
  ) {
    return false;
  }
  if (moveEvaluation?.forced_mate?.for === "PLAYER") {
    return true;
  }

  if (
    moveEvaluation.score != null &&
    getColorIndependentScore(turn, moveEvaluation.score) >= scoreThreshold
  ) {
    return true;
  }

  const delta = getMoveScoreDelta(turn, moveEvaluation, positionEvaluation);

  if (delta != null && delta < scoreDropThreshold) {
    return true;
  }

  return false;
};

export const makeMoveDescription = (
  move: Move,
  moveEvaluation: Evaluation,
  position: EvaluatedPosition
): MoveDescription => {
  const positionEvaluation = position.best_moves[0].evaluation;
  const moveIdx = findMatchingMoveIdx(position.best_moves, move);
  const scoreDelta = getMoveScoreDelta(
    move.color,
    moveEvaluation,
    positionEvaluation
  );

  return {
    isBestMove: moveIdx === 0,
    isGoodMove: isGoodMove(
      move.color,
      moveEvaluation,
      positionEvaluation,
      300,
      50
    ),
    maintainsAdvantage: doesMaintainAdvantage(
      move.color,
      moveEvaluation,
      positionEvaluation
    ),
    moveIndex: moveIdx,

    moveIsForcedMateForPlayer: moveEvaluation?.forced_mate?.for === "PLAYER",
    moveIsForcedMateForOpponent:
      moveEvaluation?.forced_mate?.for === "OPPONENT",
    maintainsForcedMateFor: doesMaintainForcedMateFor(
      moveEvaluation,
      positionEvaluation
    ),
    blundersForcedMateAgainst: doesBlunderForcedMateAgainst(
      moveEvaluation,
      positionEvaluation
    ),
    maintainsForcedMateAgainst: doesMaintainForcedMateAgainst(
      moveEvaluation,
      positionEvaluation
    ),

    moveScore: moveEvaluation.score || null,
    scoreDelta: scoreDelta,
    isDraw: moveEvaluation.score != null && moveEvaluation.score === 0,
    maintainsDraw: doesMaintainDraw(moveEvaluation, positionEvaluation),
  };
};

export const makePositionDescription = (
  position: EvaluatedPosition
): PositionDescription => {
  const positionEvaluation = position.best_moves[0].evaluation;

  var numGoodMoves = 0;
  var numMateForMoves = 0;
  var numMovesMaintainAdvantage = 0;

  for (const { move, evaluation } of position.best_moves) {
    if (isGoodMove(move.color, evaluation, positionEvaluation, 300, 50)) {
      numGoodMoves += 1;
    }

    if (evaluation?.forced_mate?.for === "OPPONENT") {
      numMateForMoves += 1;
    }

    if (doesMaintainAdvantage(move.color, evaluation, positionEvaluation)) {
      numMovesMaintainAdvantage += 1;
    }
  }

  return {
    numGoodMoves,
    numMateForMoves,
    numMovesMaintainAdvantage,
  };
};
