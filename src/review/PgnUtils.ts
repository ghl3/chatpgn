import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { EvaluationUtil } from "@/chess/Evaluation";
import { Move } from "@/chess/Move";

const makeMoveComment = (
  move: Move,
  startingPositionEvaluation: EvaluatedPosition,
  endingPositionEvaluation: EvaluatedPosition
): string => {
  const startingEvalString = EvaluationUtil.toEvalString(
    startingPositionEvaluation.evaluation
  );
  const endingEvalString = EvaluationUtil.toEvalString(
    endingPositionEvaluation.evaluation
  );

  const bestMoveDescriptions = [];
  for (const move of startingPositionEvaluation.best_moves) {
    const moveDesiption = `${move.move.san} (${EvaluationUtil.toEvalString(
      move.evaluation
    )})`;
    bestMoveDescriptions.push(moveDesiption);
  }

  const bestMoveDescription = bestMoveDescriptions.join(", ");

  return `eval before: ${startingEvalString},
    best moves: ${bestMoveDescription},
    eval after: ${endingEvalString}`;
};

export const createEvaluatedPgn = (evaluatedGame: EvaluatedGame): string => {
  const pgnLines: string[] = [];

  pgnLines.push(`[White "${evaluatedGame.white}"]\n`);
  pgnLines.push(`[Black "${evaluatedGame.black}"]\n`);
  pgnLines.push("\n");

  for (const [index, move] of evaluatedGame.moves.entries()) {
    const color = index % 2 === 0 ? "w" : "b";
    const gameMoveNumber = Math.floor(index / 2) + 1;
    const startingPositionEvaluation = evaluatedGame.evaluatedPositions[index];
    const endingPositionEvaluation =
      evaluatedGame.evaluatedPositions[index + 1];
    const prefix = color == "w" ? `${gameMoveNumber}.` : "";
    const suffix = color == "b" ? "\n" : "";
    const comment = makeMoveComment(
      move,
      startingPositionEvaluation,
      endingPositionEvaluation
    )
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ");
    pgnLines.push(`${prefix} ${move.san} {${comment}}${suffix}`);
  }
  return pgnLines.join(" ");
};
