// components/LoadingIndicator.tsx

import React from "react";
import styles from "../styles/LoadingIndicator.module.css";

interface LoadingIndicatorProps {
  loadingMessage: string;
  progress: number;
  maxProgress: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  loadingMessage,
  progress,
  maxProgress,
}) => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingMessage}>{loadingMessage}</p>
      <progress
        value={progress}
        max={maxProgress}
        className={styles.progressBar}
      ></progress>
    </div>
  );
};

export default LoadingIndicator;
