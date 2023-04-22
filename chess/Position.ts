import { Fen } from "./Fen";
import { MoveIndex } from "./MoveIndex";

export type GameState = "CHECK" | "CHECKMATE" | "STALEMATE" | "DRAW" | "OTHER";

export interface Position {
    fen: Fen,
    moveIndex: MoveIndex,
    gameState: GameState
};

