
import { Move } from "./Move";
import { Evaluation } from "./Evaluation";
import { Fen } from "./Fen";
import { Color } from "./Color";

export interface MoveAndEvaluation {
    move: Move;
    evaluation: Evaluation;
}

export interface EvaluatedPosition {
    fen: Fen;
    color: Color;
    best_moves: MoveAndEvaluation[];
}

export class EvaluatedPositionUtil {

    static findMoveEval = (evaluatedPosition: EvaluatedPosition, m: Move) => {

        for (const { move, evaluation } of evaluatedPosition.best_moves) {

            // TODO: Create a move equality function
            if (move.from === m.from && move.to === m.to && move.promotion === m.promotion) {
                return evaluation;
            }
        }
        return null;
    }
}