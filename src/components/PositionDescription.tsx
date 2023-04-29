// components/PositionDescription.tsx

import React, { FormEvent } from "react";
import styles from "../styles/Review.module.css";
import classNames from "classnames";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { EvaluationUtil } from "@/chess/Evaluation";

interface PositionDescriptionProps {
  evaluatedPosition: EvaluatedPosition | null;
  description: string | null;
}

const PositionDescription: React.FC<PositionDescriptionProps> = ({
  evaluatedPosition,
  description,
}) => (
  <>
    <div className={styles.descriptionContainer}>
      <p
        className={classNames(styles.descriptionText, {
          [styles.hidden]: !evaluatedPosition?.evaluation,
        })}
      >
        {evaluatedPosition &&
          EvaluationUtil.toEvalString(evaluatedPosition?.evaluation)}
      </p>
    </div>

    <div style={{ height: "5px", width: "100%" }}></div>

    <div className={styles.descriptionContainer}>
      <p
        className={classNames(styles.descriptionText, {
          [styles.hidden]: !description,
        })}
      >
        {description || " "}
      </p>
    </div>
  </>
);

export default PositionDescription;
