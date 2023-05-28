import { ResponseTokenizer } from "./ResponseTokenizer";
import { ReadableStream } from "web-streams-polyfill";
import { TextEncoder } from "text-encoding";

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

  for await (let token of ResponseTokenizer.tokenize(stream)) {
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

test("Tokenizer handles overall description", async () => {
  const stream = createTestStream([
    "This is a game of chess.\n\n",
    "1. e4 {White opens with pawn to e4.}\n",
    "2. Nf3 {Knight to f3.}\n",
    "3. Bb5+ {Bishop to b5, check!}\n",
  ]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "TEXT", value: "This is a game of chess." },
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "White opens with pawn to e4." },
    { type: "CLOSE_COMMENT", value: "}" },
    { type: "INDEX", value: "2." },
    { type: "MOVE", value: "Nf3" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "Knight to f3." },
    { type: "CLOSE_COMMENT", value: "}" },
    { type: "INDEX", value: "3." },
    { type: "MOVE", value: "Bb5+" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "Bishop to b5, check!" },
    { type: "CLOSE_COMMENT", value: "}" },
  ]);
});

test("Tokenizer handles separated text", async () => {
  const stream = createTestStream([
    "Overall game ",
    "description.\n\n1. e4 {White's move} e5 {Black's move}",
  ]);

  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "TEXT", value: "Overall game" },
    { type: "TEXT", value: "description." },
    { type: "INDEX", value: "1." },

    { type: "MOVE", value: "e4" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "White's move" },
    { type: "CLOSE_COMMENT", value: "}" },

    { type: "MOVE", value: "e5" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "Black's move" },
    { type: "CLOSE_COMMENT", value: "}" },
  ]);
});

test("Tokenizer handles broken input", async () => {
  const stream = createTestStream(["1. e4 {This comment is not closed\n"]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "This comment is not closed" },
  ]);
});

test("Tokenizer handles empty input", async () => {
  const stream = createTestStream([""]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([]);
});

test("Tokenizer ignores spaces and newlines", async () => {
  const stream = createTestStream(["\n    \n  \n"]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([]);
});

test("Tokenizer handles nested comments", async () => {
  const stream = createTestStream([
    "1. e4 {This is a comment {This is a nested comment} end of comment}\n",
  ]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "This is a comment" },
    { type: "OPEN_COMMENT", value: "{" },
    { type: "TEXT", value: "This is a nested comment" },
    { type: "CLOSE_COMMENT", value: "}" },
    { type: "TEXT", value: "end of comment" },
    { type: "CLOSE_COMMENT", value: "}" },
  ]);
});

test("Tokenizer handles moves without comments", async () => {
  const stream = createTestStream(["1. e4\n2. Nf3\n"]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "INDEX", value: "2." },
    { type: "MOVE", value: "Nf3" },
  ]);
});

test("Tokenizer handles simple pawn moves", async () => {
  const stream = createTestStream(["1. e4 e5\n2. d4 d5\n"]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "e4" },
    { type: "MOVE", value: "e5" },
    { type: "INDEX", value: "2." },
    { type: "MOVE", value: "d4" },
    { type: "MOVE", value: "d5" },
  ]);
});

test("Tokenizer handles captures and promotions", async () => {
  const stream = createTestStream(["1. exd5 e8=Q\n"]);
  const tokens = [];

  for await (let token of ResponseTokenizer.tokenize(stream)) {
    tokens.push(token);
  }

  expect(tokens).toEqual([
    { type: "INDEX", value: "1." },
    { type: "MOVE", value: "exd5" },
    { type: "MOVE", value: "e8=Q" },
  ]);
});
