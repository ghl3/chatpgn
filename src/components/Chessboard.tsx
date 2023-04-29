// components/ChessboardWithControls.tsx

import React, { useCallback, useState } from "react";
import { Chessboard } from "react-chessboard";
import GameControlButtons from "./GameControlButtons";
import styles from "../styles/Review.module.css";
import { useChessboard } from "@/hooks/UseChessboard";
import useArrowKeys from "@/hooks/useArrowKeys";

interface ChessboardWithControlsProps {
  chessboardData: ReturnType<typeof useChessboard>;
}

const ChessboardWithControls: React.FC<ChessboardWithControlsProps> = ({
  chessboardData,
}) => {
  //const chessboardData = useChessboard();

  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const controlsDisabled = chessboardData.game == null;

  const setGamePosition = useCallback(
    (moveIndex: number) => {
      chessboardData.setPositionFromIndex(moveIndex);
      //setDescriptionFromIndex(moveIndex);
    },
    [chessboardData]
  );

  const handleFlipBoard = useCallback(() => {
    setOrientation((prevOrientation) =>
      prevOrientation === "white" ? "black" : "white"
    );
  }, []);

  const handleLeftClick = useCallback(() => {
    if (chessboardData.moveIndex <= 0) {
      return;
    }
    setGamePosition(chessboardData.moveIndex - 1);
  }, [chessboardData.moveIndex, setGamePosition]);

  const handleRightClick = useCallback(() => {
    if (
      chessboardData.moveIndex + 1 ==
      chessboardData.game?.positions?.length
    ) {
      return;
    }
    setGamePosition(chessboardData.moveIndex + 1);
  }, [chessboardData.moveIndex, chessboardData.game, setGamePosition]);

  const handleJumpToStart = useCallback(() => {
    if (chessboardData.game) {
      setGamePosition(0);
    }
  }, [chessboardData.game, setGamePosition]);

  const handleJumpToEnd = useCallback(() => {
    if (chessboardData.game) {
      const endIndex = chessboardData.game.positions.length - 1;
      setGamePosition(endIndex);
    } else {
      setGamePosition(0);
    }
  }, [chessboardData.game, setGamePosition]);

  // Inside your Review component
  useArrowKeys({
    onLeftArrow: handleLeftClick,
    onRightArrow: handleRightClick,
  });

  return (
    <>
      <div className="row">
        <p className={styles.playerName}>
          {orientation === "white"
            ? chessboardData.game?.white
            : chessboardData.game?.black}
        </p>
      </div>

      <div className={styles.Chessboard}>
        <Chessboard
          position={chessboardData.getPositionFen()}
          customDarkSquareStyle={{ backgroundColor: "#34495e" }}
          boardWidth={chessboardData.boardSize}
          areArrowsAllowed={true}
          boardOrientation={orientation}
        />
      </div>

      <div className="row">
        <p className={styles.playerName}>
          {orientation === "white"
            ? chessboardData.game?.black
            : chessboardData.game?.white}
        </p>
      </div>

      <GameControlButtons
        isDisabled={controlsDisabled}
        handleJumpToStart={handleJumpToStart}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
        handleJumpToEnd={handleJumpToEnd}
        handleFlipBoard={handleFlipBoard}
      />
    </>
  );
};

export default ChessboardWithControls;
