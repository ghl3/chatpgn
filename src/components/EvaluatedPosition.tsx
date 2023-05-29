import React from "react";
import { EvaluatedPosition as EvaluatedPositionType } from "@/chess/EvaluatedPosition";
import { EvaluationUtil } from "@/chess/Evaluation";
import styles from "../styles/EvaluatedPosition.module.css";

interface EvaluatedPositionProps {
  evaluatedPosition: EvaluatedPositionType | null;
  isLoading: boolean;
}

const EvaluatedPosition: React.FC<EvaluatedPositionProps> = ({
  evaluatedPosition,
  isLoading,
}) => {
  if (isLoading && evaluatedPosition == null) {
    return (
      <div className={styles.evaluatedPositionContainer}>
        <p>Loading...</p>
      </div>
    );
  } else if (evaluatedPosition == null) {
    return (
      <div className={styles.evaluatedPositionContainer}>
        <p>No position evaluated yet.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.evaluatedPositionContainer}>
        <h2 className={styles.title}>Evaluated Position</h2>
        {evaluatedPosition ? (
          <>
            <p className={styles.evaluation}>
              Current evaluation:{" "}
              {EvaluationUtil.toEvalString(evaluatedPosition.evaluation)}
            </p>
            <h3 className={styles.subtitle}>Best Moves:</h3>
            {evaluatedPosition.best_moves.map((bestMove, index) => (
              <p key={index} className={styles.bestMove}>
                {bestMove.move.san} (
                {EvaluationUtil.toEvalString(bestMove.evaluation)})
              </p>
            ))}
          </>
        ) : (
          <p>No position evaluated yet.</p>
        )}
      </div>
    );
  }
};

export default EvaluatedPosition;
