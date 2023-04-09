import { ParseTree } from "@mliebelt/pgn-parser";
import { Tags, PgnMove } from "@mliebelt/pgn-types";

const moveToString = (move: PgnMove, followsComment: boolean): string => {
  let result = "";

  if (move.moveNumber && move.turn === "b" && followsComment) {
    result += `${move.moveNumber.toString()}...`;
  } else if (move.moveNumber && move.turn === "w") {
    result += `${move.moveNumber.toString()}. `;
  }

  result += `${move.notation.notation.toString()}`;

  if (
    move.commentDiag &&
    move.commentDiag.comment &&
    move.commentDiag.comment != ""
  ) {
    result += ` {${move.commentDiag.comment}}`;
  }
  return result;
};

const displayHeaders = (tags: Tags) => {
  let headerString = "";
  for (const [k, v] of Object.entries(tags)) {
    headerString += `[${k} \"${v}\"]\n`;
  }
  return headerString;
};

export const pgnToString = (pgn: ParseTree): string => {
  let pgnText = "";

  if (pgn.tags) {
    pgnText += displayHeaders(pgn.tags);
  }

  pgnText += "\n";

  let commentOnPrevious = false;
  for (const move of pgn.moves) {
    // After a white comment, we put black on a newline
    if (move.turn === "b" && commentOnPrevious) {
      pgnText += "\n";
      // Otherwise, we add a space before black
    } else if (move.turn === "b") {
      pgnText += " ";
    }
    pgnText += moveToString(move, commentOnPrevious);

    // And we always add a newline after black.
    if (move.turn === "b") {
      pgnText += "\n";
    }
    commentOnPrevious = move.commentAfter != null;
  }

  return pgnText;
};
