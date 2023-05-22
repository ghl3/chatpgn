import { parseAnnotationStream, ParsedMove } from "./AnnotationResponseParser";
import { ReadableStream } from "web-streams-polyfill";
import { TextEncoder } from "util";

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
    "1. e4 {Moving the pawn to the center} ",
    "1...e5 {Mirroring white's move}\n",
    "2. Nf3 {Attacking the pawn on e5} ",
    "Nc6 {Defending}",
  ]);

  const moves: ParsedMove[] = [];
  for await (let move of parseAnnotationStream(stream)) {
    moves.push(move);
  }

  expect(moves).toEqual([
    {
      color: "white",
      index: 1,
      move: "e4",
      comment: "Moving the pawn to the center",
    },
    {
      color: "black",
      index: 1,
      move: "e5",
      comment: "Mirroring white's move",
    },
    {
      color: "white",
      index: 2,
      move: "Nf3",
      comment: "Attacking the pawn on e5",
    },
    {
      color: "black",
      index: 2,
      move: "Nc6",
      comment: "Defending",
    },
  ]);
});

it("parses chess moves correctly with additional tricky cases", async () => {
  const stream = createTestStream([
    "1. Nf3 {Knight to f3} ",
    "1...e5 {Pawn to e5}\n",
    "2. Bb5+ {Bishop to b5 check} ",
    "Bd7 {Bishop to d7}\n",
    "3. O-O {White castles} ",
    "3...O-O-O {Black castles queenside}\n",
  ]);

  const moves: ParsedMove[] = [];
  for await (let move of parseAnnotationStream(stream)) {
    moves.push(move);
  }

  expect(moves).toEqual([
    {
      color: "white",
      index: 1,
      move: "Nf3",
      comment: "Knight to f3",
    },
    {
      color: "black",
      index: 1,
      move: "e5",
      comment: "Pawn to e5",
    },
    {
      color: "white",
      index: 2,
      move: "Bb5+",
      comment: "Bishop to b5 check",
    },
    {
      color: "black",
      index: 2,
      move: "Bd7",
      comment: "Bishop to d7",
    },
    {
      color: "white",
      index: 3,
      move: "O-O",
      comment: "White castles",
    },
    {
      color: "black",
      index: 3,
      move: "O-O-O",
      comment: "Black castles queenside",
    },
  ]);
});

it("throws error on malformed data", async () => {
  const stream = createTestStream([
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
