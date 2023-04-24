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
  const [boardSize, setBoardSize] = useState<number>(400);

  const loadGame = (game: Game) => {
    setGame(game);
    setPosition(game.positions[0]);
    setMoveIndex(0);
  };

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
      return position.color === "w" ? "white" : "black";
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
      // The board should be no more than 1/3 the width
      // We round to the nearest 10px
      const frac = 3;
      const newBoardSize = Math.floor(Math.min(vw / frac, vh - 250) / 10) * 10;
      setBoardSize(newBoardSize);
    };

    resizeBoard();

    window.addEventListener("resize", resizeBoard);
  }, []);

  const clearGame = () => {
    setGame(null);
    setMoveIndex(0);
    setPosition(null);
  };

  return {
    game,
    moveIndex,
    getPositionFen,
    getBoardOrientation,
    boardSize,
    clearGame,
    loadGame,
    setPositionFromIndex,
  };
};
