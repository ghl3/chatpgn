// components/GameControlButtons.tsx

import React from "react";
import styles from "../styles/Review.module.css";

interface GameControlButtonsProps {
  isLoading: boolean;
  handleJumpToStart: () => void;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  handleJumpToEnd: () => void;
  handleFlipBoard: () => void;
}

const GameControlButtons: React.FC<GameControlButtonsProps> = ({
  isLoading,
  handleJumpToStart,
  handleLeftClick,
  handleRightClick,
  handleJumpToEnd,
  handleFlipBoard,
}) => (
  <div className="ui center aligned basic segment">
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleJumpToStart}
      disabled={isLoading}
    >
      &laquo;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleLeftClick}
      disabled={isLoading}
    >
      &larr;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleRightClick}
      disabled={isLoading}
    >
      &rarr;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleJumpToEnd}
      disabled={isLoading}
    >
      &raquo;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleFlipBoard}
      disabled={isLoading}
    >
      Flip Board
    </button>
  </div>
);

export default GameControlButtons;
