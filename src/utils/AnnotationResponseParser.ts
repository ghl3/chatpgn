import { TextEncoder, TextDecoder } from "util"; // This is the addition.

export type ParsedMove = {
  color: "white" | "black";
  index: number;
  move: string;
  comment?: string;
};

// In your generator function:
export async function* parseAnnotationStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<ParsedMove, void, unknown> {
  let buffer = "";
  let currentIndex = 1;
  let currentColor: "white" | "black" = "white";
  let parsed = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const text = new TextDecoder("utf-8").decode(value);
    buffer += text;

    const result = parseMoves(buffer, currentIndex, currentColor);
    parsed = result.parsed;
    buffer = buffer.slice(result.consumedChars);

    while (parsed.length > 0) {
      const move = parsed.shift();
      if (move) {
        yield move;

        if (move.color === "black") {
          currentIndex++;
          currentColor = "white";
        } else {
          currentColor = "black";
        }
      }
    }
  }
}

export function parseMoves(
  text: string,
  startingIndex: number,
  startingColor: "white" | "black"
): { parsed: ParsedMove[]; consumedChars: number } {
  const parsed: ParsedMove[] = [];
  let index = startingIndex;
  let color = startingColor;
  let consumedChars = 0;

  const regex =
    /(\d+\.)?\s*([NBKRQP]?[a-h][1-8][+#]?|O-O-O|O-O)(\s*\{([^}]+)\})?/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      // This is a new turn
      color = "white";
      if (index !== startingIndex) {
        index++;
      }
    } else {
      // This is a second move in a turn
      color = "black";
    }

    parsed.push({
      color,
      index,
      move: match[2],
      comment: match[4] || undefined,
    });

    consumedChars = match.index + match[0].length;

    if (color === "black") {
      break; // we stop after parsing a black move
    }
  }

  return { parsed, consumedChars };
}
