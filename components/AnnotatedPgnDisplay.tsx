import React from "react";
import { ParsedPGN } from "pgn-parser";

interface AnnotatedPgnDisplayProps {
  pgn: ParsedPGN | null;
}

const AnnotatedPgnDisplay: React.FC<AnnotatedPgnDisplayProps> = ({ pgn }) => {
  if (!pgn) {
    return null;
  }

  return (
    <div>
      <h2>Annotated PGN:</h2>
      <pre>{JSON.stringify(pgn, null, 2)}</pre>
    </div>
  );
};

export default AnnotatedPgnDisplay;
