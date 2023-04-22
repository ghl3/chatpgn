import { Position } from "./Position";

export type GameStage = 'OPENING' | 'MIDDLEGAME' | 'ENDGAME';

export class GameStageUtil {

    static getGameStage = (position: Position): GameStage => {

        const piecePlacements = position.fen.split(" ")[0];
        const noQueens = (!piecePlacements.includes("q")) && (!piecePlacements.includes("Q"));

        if (noQueens) {
            return 'ENDGAME';
        } else if (position.moveIndex.moveNumber <= 8) {
            return "OPENING";
        } else {
            return "MIDDLEGAME";
        }
    }
}