import {
  parseAnnotationStream,
  ParsedMove,
  parseMoves,
} from "./AnnotationResponseParser"; // Adjust the import according to your file structure
import { ReadableStream } from "web-streams-polyfill";
import { TextEncoder, TextDecoder } from "util"; // This is the addition.

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

/*
describe("parseMoves", () => {
  it("parses a single white move with an annotation", () => {
    const text = "1. e4 {Moving the pawn to the center}";
    const { parsed, consumedChars } = parseMoves(text, 1, "white");

    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toEqual({
      color: "white",
      index: 1,
      move: "e4",
      annotation: "Moving the pawn to the center",
    });
    expect(consumedChars).toEqual(text.length);
  });

  it("parses a full turn with annotations", () => {
    const text =
      "1. e4 {Moving the pawn to the center} e5 {Mirroring white's move} ";
    const { parsed, consumedChars } = parseMoves(text, 1, "white");

    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toEqual({
      color: "white",
      index: 1,
      move: "e4",
      annotation: "Moving the pawn to the center",
    });
    expect(parsed[1]).toEqual({
      color: "black",
      index: 1,
      move: "e5",
      annotation: "Mirroring white's move",
    });
    expect(consumedChars).toEqual(text.length - 1);
  });

  it("parses multiple turns", () => {
    const text =
      "1. e4 {Moving the pawn to the center} e5 {Mirroring white's move} 2. Nf3 {Attacking the pawn on e5} ";
    const { parsed, consumedChars } = parseMoves(text, 1, "white");

    expect(parsed).toHaveLength(2);
    expect(parsed[0]).toEqual({
      color: "white",
      index: 1,
      move: "e4",
      annotation: "Moving the pawn to the center",
    });
    expect(parsed[1]).toEqual({
      color: "black",
      index: 1,
      move: "e5",
      annotation: "Mirroring white's move",
    });
    expect(consumedChars).toEqual(text.indexOf("2.") - 1);
  });
});
*/
