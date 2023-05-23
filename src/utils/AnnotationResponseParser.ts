import { MoveDescription } from "@/review/ReviewedGame";
import { TextDecoder } from "text-encoding";

export async function* parseAnnotationStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string | MoveDescription, void, unknown> {
  let buffer = "";
  let currentColor: "white" | "black" = "white";
  let parsed: MoveDescription[] = [];
  let description: string | null = null;
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();

    const text = new TextDecoder("utf-8").decode(value);
    buffer += text;

    // If description not yet parsed, do that first
    if (!description) {
      let descriptionEndIndex = buffer.search(/\n{2,}/);
      if (descriptionEndIndex === -1) {
        // We don't yet have the full description, wait for more data
        if (done) {
          throw new Error(
            "Malformed data encountered: description is incomplete."
          );
        } else {
          continue;
        }
      }
      let descriptionMatch = buffer.match(/\n{2,}/);
      if (descriptionMatch) {
        description = buffer.slice(0, descriptionEndIndex).trim();
        buffer = buffer.slice(descriptionEndIndex + descriptionMatch[0].length);
        yield description;
      }
    }

    while (true) {
      let result;
      try {
        result = parseMoves(buffer, currentColor);
      } catch (error) {
        throw error;
      }

      if (result.moreExpected && !done) {
        // More chunks are expected, so don't parse the current buffer yet
        break;
      } else {
        parsed = result.parsed;
        buffer = buffer.slice(result.consumedChars);
      }

      while (parsed.length > 0) {
        const move = parsed.shift();
        if (move) {
          yield move;
          currentColor = move.color === "white" ? "black" : "white";
        }
      }

      if (done) {
        if (buffer.trim() !== "") {
          // Remaining buffer contains data that can't be parsed as a move.
          throw new Error("Malformed data encountered");
        }
        break;
      }
    }

    if (done) {
      break;
    }
  }
}

export function parseMoves(
  text: string,
  startingColor: "white" | "black"
): { parsed: MoveDescription[]; consumedChars: number; moreExpected: boolean } {
  const parsed: MoveDescription[] = [];
  let color = startingColor;
  let consumedChars = 0;
  let moreExpected = false;

  const regex =
    /(\d+\.)?\s*([NBKRQ]?[a-h]?[1-8]?[x]?[a-h][1-8][+#]?|O-O-O|O-O)(\s*\{([^}]+)\})?/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    parsed.push({
      color: color,
      move: match[2],
      description: match[4] || "",
    });

    consumedChars = match.index + match[0].length;

    if (color === "white") {
      color = "black";
    } else {
      color = "white";
    }
  }

  // Check if there's more move data expected.
  moreExpected = !!text
    .substring(consumedChars)
    .match(/\d+\.\s*[NBKRQa-h1-8x#O+-]?/);

  return { parsed, consumedChars, moreExpected };
}
