// components/GameControlButtons.tsx

import React from "react";
import styles from "../styles/Review.module.css";

interface GameControlButtonsProps {
  isDisabled: boolean;
  handleJumpToStart: () => void;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  handleJumpToEnd: () => void;
  handleFlipBoard: () => void;
}

const GameControlButtons: React.FC<GameControlButtonsProps> = ({
  isDisabled,
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
      disabled={isDisabled}
    >
      &laquo;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleLeftClick}
      disabled={isDisabled}
    >
      &larr;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleRightClick}
      disabled={isDisabled}
    >
      &rarr;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleJumpToEnd}
      disabled={isDisabled}
    >
      &raquo;
    </button>
    <button
      className={`${styles.localButton} ui small button`}
      onClick={handleFlipBoard}
      disabled={isDisabled}
    >
      Flip Board
    </button>
  </div>
);

export default GameControlButtons;
