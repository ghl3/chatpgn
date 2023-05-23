import { MoveDescription } from "@/review/ReviewedGame";
import { TextDecoder } from "text-encoding";

export type TokenType =
  | "TEXT"
  | "MOVE"
  | "INDEX"
  | "OPEN_BRACKET"
  | "CLOSE_BRACKET";

export interface Token {
  type: TokenType;
  value: string;
}

export class Tokenizer {
  static async *tokenize(
    stream: ReadableStream<Uint8Array>
  ): AsyncGenerator<Token, void, unknown> {
    const decoder = new TextDecoder("utf-8");
    let reader = stream.getReader();
    let buffer = "";

    while (true) {
      let { value: chunk, done } = await reader.read();
      console.log(
        `Chunk: ${chunk}, Decoded: ${decoder.decode(chunk)} Done: ${done}`
      );
      buffer += decoder.decode(chunk); //, { stream: !done });

      // Log the buffer content
      console.log(`Buffer: ${buffer}`);

      while (true) {
        let match;

        // Check for move index
        if ((match = buffer.match(/^\d+\.\s*/))) {
          console.log(`Matched INDEX: ${match[0].trim()}`);
          yield { type: "INDEX", value: match[0].trim() };
          buffer = buffer.slice(match[0].length);
          continue;
        }

        // Check for move
        if (
          (match = buffer.match(
            /^(O-O-O|O-O|[a-h][1-8][\+#]?|N[a-h][1-8][\+#]?|B[a-h][1-8][\+#]?|R[a-h][1-8][\+#]?|Q[a-h][1-8][\+#]?|K[a-h][1-8][\+#]?)\s*/
          ))
        ) {
          console.log(`Matched MOVE: ${match[0].trim()}`);
          yield { type: "MOVE", value: match[0].trim() };
          buffer = buffer.slice(match[0].length);
          continue;
        }

        // Check for opening bracket
        if ((match = buffer.match(/^\{\s*/))) {
          console.log(`Matched OPEN_BRACKET: ${match[0].trim()}`);
          yield { type: "OPEN_BRACKET", value: match[0].trim() };
          buffer = buffer.slice(match[0].length);
          continue;
        }

        // Check for closing bracket
        if ((match = buffer.match(/^\}\s*/))) {
          console.log(`Matched CLOSE_BRACKET: ${match[0].trim()}`);
          yield { type: "CLOSE_BRACKET", value: match[0].trim() };
          buffer = buffer.slice(match[0].length);
          continue;
        }
        // Check for text
        if ((match = buffer.match(/^[^\n^\{^\}]*\n+/))) {
          console.log(`Matched TEXT: ${match[0].trim()}`);
          yield { type: "TEXT", value: match[0].trim() };
          buffer = buffer.slice(match[0].length);
          continue;
        }

        break;
      }

      if (done) {
        if (buffer.length > 0) {
          console.log(`Yielded remaining TEXT: ${buffer}`);
          yield { type: "TEXT", value: buffer };
        }
        break;
      }
    }
  }
}

/*
export async function* parseAnnotationStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string | MoveDescription, void, unknown> {
  let buffer = "";
  let currentColor: "white" | "black" = "white";
  let parsed: MoveDescription[] = [];
  let descriptionParsed = false;
  const reader = stream.getReader();
  let state = "description";

  while (true) {
    const { done, value } = await reader.read();

    const text = new TextDecoder("utf-8").decode(value);
    buffer += text;

    switch (state) {
      case "description":
        let descriptionEndIndex = buffer.search(/\n{2,}/);
        if (descriptionEndIndex === -1) {
          if (done) {
            throw new Error(
              "Malformed data encountered: description is incomplete."
            );
          } else {
            break; // Not enough data yet, keep reading
          }
        }

        let descriptionMatch = buffer.match(/\n{2,}/);
        if (descriptionMatch) {
          let description = buffer.slice(0, descriptionEndIndex).trim();
          buffer = buffer.slice(
            descriptionEndIndex + descriptionMatch[0].length
          );
          descriptionParsed = true;
          yield description;
          state = "moves";
        }
        break;
      case "moves":
        while (true) {
          let result;
          try {
            result = parseMoves(buffer, currentColor);
          } catch (error) {
            throw error;
          }

          if (result.moreExpected && !done) {
            break; // Not enough data yet, keep reading
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

          if (done && buffer.trim() === "") {
            return; // No more data and buffer is empty, we are done
          }

          if (done) {
            throw new Error(
              "Malformed data encountered: unexpected characters at the end"
            );
          }
        }
        break;
      default:
        if (done) {
          throw new Error(
            "Malformed data encountered: description is incomplete."
          );
        }
    }
  }
}
function parseMoves(
  str: string,
  currentColor: "white" | "black"
): { parsed: MoveDescription[]; moreExpected: boolean; consumedChars: number } {
  let regex = /\* (?<description>.+?) \[(?<move>[a-h1-8O-+=#xNBRQK]+)\]/g;
  let parsed: MoveDescription[] = [];
  let match;
  let lastMatchEnd = 0;

  while ((match = regex.exec(str)) !== null) {
    let { description, move } = match.groups!;

    // Trim spaces and newlines
    description = description.trim();
    move = move.trim();

    // Push parsed data
    parsed.push({
      color: currentColor,
      move: move,
      description: description,
    });

    currentColor = currentColor === "white" ? "black" : "white";
    lastMatchEnd = match.index + match[0].length;
  }

  let remainingStr = str.slice(lastMatchEnd).trim();
  let moreExpected = remainingStr !== "";

  return { parsed, moreExpected, consumedChars: lastMatchEnd };
}
*/
