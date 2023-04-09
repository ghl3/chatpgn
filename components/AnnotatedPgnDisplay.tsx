import React from "react";
import { ParsedPGN } from "pgn-parser";
import { pgnToString } from "../utils/pgnToString";
import styles from "../styles/AnnotatedPgnDisplay.module.css";

interface AnnotatedPgnDisplayProps {
  pgn: ParsedPGN | null;
}

const AnnotatedPgnDisplay: React.FC<AnnotatedPgnDisplayProps> = ({ pgn }) => {
  if (!pgn) {
    return null;
  }

  const pgnString = pgnToString(pgn);

  return (
    <>
      <h2>Annotated PGN:</h2>
      <div className={styles.annotatedPgnWrapper}>
        <pre>{pgnString}</pre>
      </div>
    </>
  );
};

export default AnnotatedPgnDisplay;
