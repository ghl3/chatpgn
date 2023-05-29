// components/PositionDescription.tsx

import React from "react";
import styles from "../styles/PositionDescription.module.css";

interface PositionDescriptionProps {
  description: string | null;
  isLoading: boolean;
}

const PositionDescription: React.FC<PositionDescriptionProps> = ({
  description,
  isLoading,
}) => {
  if (isLoading && description == null) {
    return (
      <div className={styles.descriptionContainer}>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  } else if (description == null) {
    return (
      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionText}></p>
      </div>
    );
  } else {
    return (
      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionText}>{description}</p>
      </div>
    );
  }
};

export default PositionDescription;
