import { Color } from "./Color";

export interface MoveIndex {
  // The move number includes BOTH white and black.
  // So, moves are iterated as:
  // 1 white
  // 1 black
  // 2 white
  // 2 black
  // ...
  moveNumber: number;
  turn: Color;
}

export class MoveIndexUtil {
  static toString = (moveIndex: MoveIndex): string => {
    return `${moveIndex.moveNumber}${moveIndex.turn}`;
  };

  // Returns a zero-based global index for the move
  static getZeroBasedIndex = (moveIndex: MoveIndex): number => {
    return 2 * (moveIndex.moveNumber - 1) + (moveIndex.turn === "w" ? 0 : 1);
  };
}
