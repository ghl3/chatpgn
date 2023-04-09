import React from "react";
import { pgnToString } from "../utils/pgnToString";
import styles from "../styles/AnnotatedPgnDisplay.module.css";
import { ParseTree } from "@mliebelt/pgn-parser";

interface AnnotatedPgnDisplayProps {
  pgn: ParseTree | null;
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
