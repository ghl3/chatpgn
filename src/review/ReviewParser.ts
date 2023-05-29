import { MoveDescription, OverallDescription } from "@/review/ReviewedGame";

import * as pgnParser from "@/pgn/parser";

interface TaggedOverallDescription extends OverallDescription {
  kind: "comment";
}

interface TaggedMoveDescription extends MoveDescription {
  kind: "move";
}

type ReviewToken = TaggedOverallDescription | TaggedMoveDescription;

export async function* parseReview(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<ReviewToken, void, unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let moveIndex = 0;

  try {
    while (true) {
      const { value: chunk, done } = await reader.read();
      if (done) {
        break;
      }

      // Decode the chunk and add it to the buffer
      buffer += decoder.decode(chunk, { stream: true });

      // Process each line in the buffer
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        // Parse the line into a ReviewToken and yield it
        // Parse the line into a ReviewToken and yield it
        for (const token of parseLine(line, moveIndex)) {
          yield token;
          if (token.kind === "move") {
            moveIndex++;
          }
        }
      }
    }

    // Process any remaining data in the buffer (if it does not end with a newline)
    if (buffer.length > 0) {
      // Parse the line into a ReviewToken and yield it
      for (const token of parseLine(buffer, moveIndex)) {
        yield token;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function* parseLine(
  line: string,
  moveIndex: number
): Generator<ReviewToken, void, unknown> {
  // Remove leading and trailing whitespace
  line = line.trim();

  // If it's empty or whitespace, skip it
  if (line.length === 0) {
    return;
  }

  // Try to parse the line with your PEG parser
  try {
    const moves = pgnParser.parseMoves(line);

    for (const move of moves) {
      yield {
        ...makeMoveDescription(move, moveIndex),
        kind: "move",
      };
      // Note that this only increments moveIndex within this function.
      moveIndex++;
    }
  } catch (error) {
    // If the line could not be parsed, return it as text
    yield {
      description: line, // Assuming `OverallDescription` has a `text` property
      kind: "comment",
    };
  }
}

function makeMoveDescription(
  move: pgnParser.Move,
  moveIndex: number
): MoveDescription {
  if (!move.move) {
    throw new Error("Move object is missing 'move' field");
  }

  const color: "white" | "black" = moveIndex % 2 === 0 ? "white" : "black";
  const description =
    move.comments?.map((comment) => comment.text).join(" ") ?? "";

  return {
    color,
    move: move.move,
    description,
  };
}
