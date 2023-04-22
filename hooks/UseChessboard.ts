import { Fen } from "@/chess/Fen";
import { Game } from "@/chess/Game";
import { Position } from "@/chess/Position";
import { useState, useEffect } from "react";

const defaultFen: Fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const useChessboard = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const [position, setPosition] = useState<Position | null>(null);

  const [boardSize, setBoardSize] = useState<number>(600);

  const setPositionFromIndex = (moveIndex: number) => {
    if (game) {
      setMoveIndex(moveIndex);
      setPosition(game.positions[moveIndex]);
    }
  };

  const getPositionFen = (): Fen => {
    if (position) {
      return position.fen;
    } else {
      return defaultFen;
    }
  };

  const getBoardOrientation = (): "white" | "black" => {
    if (position) {
      return position.moveIndex.turn === "w" ? "white" : "black";
    } else {
      return "white";
    }
  };

  // TO Return:
  // boardSize,

  // Ensure the board is always sized correctly
  useEffect(() => {
    // Initialize the board
    const getViewportSizes = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      return [vw, vh];
    };

    const resizeBoard = () => {
      const [vw, vh] = getViewportSizes();
      const UiHeight = 250;
      let newBoardSize;

      if (vw > vh) {
        newBoardSize = vh - UiHeight;
      } else {
        if (vh - vw <= UiHeight) {
          newBoardSize = vh - UiHeight;
        } else {
          newBoardSize = vw - 52;
        }
      }

      setBoardSize(newBoardSize);
    };

    resizeBoard();

    window.addEventListener("resize", resizeBoard);
  }, []);

  return {
    game,
    setGame,
    setPositionFromIndex,
    getPositionFen,
    getBoardOrientation,
    boardSize,
  };
};
