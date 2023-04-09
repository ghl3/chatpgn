import { ParsedPGN, Move, Header } from "pgn-parser";

const moveToString = (move: Move): string => {
  let result = "";
  if (move.move_number) {
    result += move.move_number + ".";
  }
  result += move.move;
  if (move.comments && move.comments.length > 0) {
    result += " {" + move.comments.join(", ") + "}";
  }
  return result;
};

const displayHeaders = (headers: Header[] | null) => {
  if (!headers) return "";
  let headerString = "";
  headers.forEach((header) => {
    headerString += `[${header.name} "${header.value}"]\n`;
  });
  return headerString;
};

export const pgnToString = (parsedPgn: ParsedPGN): string => {
  let pgnText = displayHeaders(parsedPgn.headers);

  parsedPgn.moves.forEach((move) => {
    pgnText += moveToString(move) + " ";
  });

  pgnText += parsedPgn.result;

  return pgnText;
};
