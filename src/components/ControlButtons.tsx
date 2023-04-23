// components/ControlButtons.tsx

import React from "react";
import styles from "../styles/Review.module.css";

interface ControlButtonsProps {
  isLoading: boolean;
  handleJumpToStart: () => void;
  handleLeftClick: () => void;
  handleRightClick: () => void;
  handleJumpToEnd: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isLoading,
  handleJumpToStart,
  handleLeftClick,
  handleRightClick,
  handleJumpToEnd,
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
  </div>
);

export default ControlButtons;
