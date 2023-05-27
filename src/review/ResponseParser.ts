import { MoveDescription, OverallDescription } from "@/review/ReviewedGame";
import { ResponseTokenizer } from "./ResponseTokenizer";
import { TextEncoder } from "text-encoding";

export enum ParserState {
  Initial,
  Index,
  Move,
  CommentOpen,
  CommentText,
  CommentClose,
}

export class ResponseParser {
  static async *parse(
    stream: ReadableStream<Uint8Array>
  ): AsyncGenerator<OverallDescription | MoveDescription, void, unknown> {
    let state: ParserState = ParserState.Initial;
    let color: "white" | "black" = "white";
    let move: MoveDescription | null = null;

    const tokenizer = ResponseTokenizer.tokenize(stream);

    for await (let token of tokenizer) {
      switch (state) {
        case ParserState.Initial:
          if (token.type === "TEXT") {
            yield { description: token.value };
            state = ParserState.Index;
          } else {
            throw new Error("Expected overall description");
          }
          break;
        case ParserState.Index:
          if (token.type === "INDEX") {
            color = "white";
            state = ParserState.Move;
          } else if (token.type === "MOVE") {
            // Handle the case where the index is missing
            move = { color: color, move: token.value, description: "" };
            yield move;
            state = ParserState.CommentOpen;
          } else {
            throw new Error("Expected index or move");
          }
          break;
        case ParserState.Move:
          if (token.type === "MOVE") {
            move = { color: color, move: token.value, description: "" };
            yield move;
            state = ParserState.CommentOpen;
          } else if (token.type === "INDEX") {
            color = "white";
          } else {
            throw new Error("Expected move or next turn");
          }
          break;
        case ParserState.CommentOpen:
          if (token.type === "OPEN_COMMENT") {
            state = ParserState.CommentText;
          } else if (token.type === "MOVE" || token.type === "INDEX") {
            // Handle the case where the comment is missing
            state = ParserState.Index;
            color = color === "white" ? "black" : "white";
          } else {
            throw new Error("Expected comment open or next move");
          }
          break;
        case ParserState.CommentText:
          if (token.type === "TEXT") {
            move!.description = token.value;
            state = ParserState.CommentClose;
          } else if (token.type === "CLOSE_COMMENT") {
            // Handle the case where there's no text within a comment
            state = ParserState.Index;
            color = color === "white" ? "black" : "white";
          } else {
            throw new Error("Expected comment text or comment close");
          }
          break;
        case ParserState.CommentClose:
          if (token.type === "CLOSE_COMMENT") {
            state = ParserState.Index;
            color = color === "white" ? "black" : "white";
          } else {
            throw new Error("Expected comment close");
          }
          break;
      }
    }

    if (
      state === ParserState.CommentOpen ||
      state === ParserState.CommentText
    ) {
      throw new Error("Game ended in the middle of a comment");
    }
  }
}
