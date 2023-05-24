import { Tokenizer } from "./AnnotationResponseParser";
import { ReadableStream } from "web-streams-polyfill";
import { TextEncoder } from "text-encoding";
import { MoveDescription } from "@/review/ReviewedGame";

import { Readable } from "stream";

function createTestStream(strings: string[]): ReadableStream<Uint8Array> {
  async function* generateChunks() {
    const encoder = new TextEncoder();
    for (const string of strings) {
      yield encoder.encode(string);
    }
  }

  return new ReadableStream<Uint8Array>({
    start(controller) {
      (async () => {
        for await (const chunk of generateChunks()) {
          controller.enqueue(chunk);
        }
        controller.close();
      })();
    },
  });
}

test("Tokenizer emits correct tokens", async () => {
  const stream = createTestStream([
    "1. e4 {foobar}\n",
    "2. Nf3\n3. Bb5+ {baz}\n",
  ]);
  const tokens = [];

  for await (let token of Tokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "foobar" },
    { type: "CLOSE_COMMENT", value: "}" },
    { type: "INDEX", value: "2." },
    { type: "MOVE", value: "Nf3" },
    { type: "INDEX", value: "3." },
    { type: "MOVE", value: "Bb5+" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "baz" },
    { type: "CLOSE_COMMENT", value: "}" },
  ]);
});

/*
function createTestStream(strings: string[]): ReadableStream<Uint8Array> {
  async function* generateChunks() {
    const encoder = new TextEncoder();
    for (const string of strings) {
      yield encoder.encode(string);
    }
  }

  return new ReadableStream<Uint8Array>({
    start(controller) {
      (async () => {
        for await (const chunk of generateChunks()) {
          controller.enqueue(chunk);
        }
        controller.close();
      })();
    },
  });
}

// We'll use an async function to test async generators
it("parses chess moves correctly", async () => {
  const stream = createTestStream([
    "Overall Description\n\n",
    "1. e4 {Moving the pawn to the center} ",
    "1...e5 {Mirroring white's move}\n",
    "2. Nf3 {Attacking the pawn on e5} ",
    "Nc6 {Defending}",
  ]);

  const moves: (MoveDescription | string)[] = [];
  for await (let move of parseAnnotationStream(stream)) {
    moves.push(move);
  }

  expect(moves).toEqual([
    {
      color: "white",
      move: "e4",
      description: "Moving the pawn to the center",
    },
    {
      color: "black",
      move: "e5",
      description: "Mirroring white's move",
    },
    {
      color: "white",
      move: "Nf3",
      description: "Attacking the pawn on e5",
    },
    {
      color: "black",
      move: "Nc6",
      description: "Defending",
    },
  ]);
});

it("parses chess moves correctly with additional tricky cases", async () => {
  const stream = createTestStream([
    "Overall Description\n\n",
    "1. Nf3 {Knight to f3} ",
    "1...e5 {Pawn to e5}\n",
    "2. Bb5+ {Bishop to b5 check} ",
    "Bd7 {Bishop to d7}\n",
    "3. O-O {White castles} ",
    "3...O-O-O {Black castles queenside}\n",
  ]);

  const moves: (MoveDescription | string)[] = [];
  for await (let move of parseAnnotationStream(stream)) {
    moves.push(move);
  }

  expect(moves).toEqual([
    {
      color: "white",
      move: "Nf3",
      description: "Knight to f3",
    },
    {
      color: "black",
      move: "e5",
      description: "Pawn to e5",
    },
    {
      color: "white",
      move: "Bb5+",
      description: "Bishop to b5 check",
    },
    {
      color: "black",
      move: "Bd7",
      description: "Bishop to d7",
    },
    {
      color: "white",
      move: "O-O",
      description: "White castles",
    },
    {
      color: "black",
      move: "O-O-O",
      description: "Black castles queenside",
    },
  ]);
});

it("throws error on malformed data", async () => {
  const stream = createTestStream([
    "Overall Description\n\n",
    "1. e4 {Good move} ",
    "1...e5 {Response}\n",
    "This is not a valid move\n",
    "3. Nf3 {Another move}",
  ]);

  await expect(async () => {
    for await (let _ of parseAnnotationStream(stream)) {
    }
  }).rejects.toThrowError("Malformed data encountered");
});
*/
