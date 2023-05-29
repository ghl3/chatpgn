// components/PositionDescription.tsx

import React from "react";
import styles from "../styles/PositionDescription.module.css";
import classNames from "classnames";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { EvaluationUtil } from "@/chess/Evaluation";

type MoveDescriptionComponentProps = {
  description: string | null;
  isLoading: boolean;
};

const MoveDescriptionComponent: React.FC<MoveDescriptionComponentProps> = ({
  description,
  isLoading,
}) => {
  if (isLoading && description === null) {
    return <p className={styles.loadingText}>Loading</p>;
  } else {
    return <p className={styles.descriptionText}>{description}</p>;
  }
};

interface PositionDescriptionProps {
  evaluatedPosition: EvaluatedPosition | null;
  description: string | null;
  isLoading: boolean;
}

const PositionDescription: React.FC<PositionDescriptionProps> = ({
  evaluatedPosition,
  description,
  isLoading,
}) => (
  <>
    <div className={styles.descriptionContainer}>
      <p
        className={classNames(styles.evaluationText, {
          [styles.hidden]: !evaluatedPosition?.evaluation,
        })}
      >
        {evaluatedPosition &&
          EvaluationUtil.toEvalString(evaluatedPosition?.evaluation)}
      </p>
    </div>

    <div className={styles.spacingDiv} />

    <div className={styles.descriptionContainer}>
      <MoveDescriptionComponent
        description={description}
        isLoading={isLoading}
      />
    </div>
  </>
);

export default PositionDescription;
