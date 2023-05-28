import { TextDecoder } from "text-encoding";

export type TokenType =
  | "TEXT"
  | "MOVE"
  | "INDEX"
  | "OPEN_COMMENT"
  | "CLOSE_COMMENT"
  | "UNPARSED";

export interface Token {
  type: TokenType;
  value: string;
}
const MOVE_REGEX =
  /^(O-O-O|O-O|([a-h][1-8]|[NBRQK][a-h]?x?)[a-h][1-8](=[NBRQ])?[\+#]?|[a-h]x[a-h][1-8]|([a-h][1-8])?=[NBRQ])(\s|$)\s*/;

export class ResponseTokenizer {
  static async *tokenize(
    stream: ReadableStream<Uint8Array>
  ): AsyncGenerator<Token, void, unknown> {
    const decoder = new TextDecoder("utf-8");
    let reader = stream.getReader();
    let buffer = "";
    let done = false;

    while (true) {
      if (buffer.length === 0) {
        const { done: streamDone, value } = await reader.read();
        if (value) {
          buffer += decoder.decode(value, { stream: true });
        }
        if (streamDone) {
          buffer += decoder.decode(); // finish the stream
          done = streamDone;
        }
      }

      let match = null;

      // Skip newlines and whitespace
      if ((match = buffer.match(/^(\s*\n)+/))) {
        buffer = buffer.slice(match[0].length);
        continue;
      }

      // Check for open comment
      if ((match = buffer.match(/^\{\s*/))) {
        yield { type: "OPEN_COMMENT", value: match[0].trim() };
        buffer = buffer.slice(match[0].length);
        continue;
      }

      // Check for close comment
      if ((match = buffer.match(/^\}\s*/))) {
        yield { type: "CLOSE_COMMENT", value: match[0].trim() };
        buffer = buffer.slice(match[0].length);
        continue;
      }

      // Check for move index
      if ((match = buffer.match(/^\d+\.\s*/))) {
        yield { type: "INDEX", value: match[0].trim() };
        buffer = buffer.slice(match[0].length);
        continue;
      }

      // Check for moves
      if ((match = buffer.match(MOVE_REGEX))) {
        yield { type: "MOVE", value: match[0].trim() };
        buffer = buffer.slice(match[0].length);
        continue;
      }

      // Check for text
      if ((match = buffer.match(/^[^\n\{\}]+/))) {
        yield { type: "TEXT", value: match[0].trim() };
        buffer = buffer.slice(match[0].length);
        continue;
      }

      if (buffer.length === 0) {
        if (done) {
          break;
        }
      } else {
        yield { type: "UNPARSED", value: buffer };
        return;
      }
    }
  }
}
