import { TextDecoder } from "util";

export type ParsedMove = {
  color: "white" | "black";
  index: number;
  move: string;
  comment?: string;
};

export async function* parseAnnotationStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<ParsedMove, void, unknown> {
  let buffer = "";
  let currentIndex = 1;
  let currentColor: "white" | "black" = "white";
  let parsed: ParsedMove[] = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const text = new TextDecoder("utf-8").decode(value);
    buffer += text;

    try {
      const result = parseMoves(buffer, currentIndex, currentColor);
      parsed = result.parsed;
      buffer = buffer.slice(result.consumedChars);
    } catch (error) {
      throw error;
    }

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
    /(\d+\.)?\s*([NBKRQ]?[a-h]?[1-8]?[x]?[a-h][1-8][+#]?|O-O-O|O-O)(\s*\{([^}]+)\})?/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    parsed.push({
      color,
      index,
      move: match[2],
      comment: match[4] || undefined,
    });

    consumedChars = match.index + match[0].length;

    if (color === "white") {
      color = "black";
    } else {
      color = "white";
      index++;
    }
  }

  // If no moves were parsed from the input, it was malformed
  if (parsed.length === 0) {
    throw new Error("Malformed data encountered");
  }

  return { parsed, consumedChars };
}
