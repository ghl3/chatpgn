import { ResponseParser } from "./ResponseParser";
import { TextEncoder } from "text-encoding";
import { ReadableStream } from "web-streams-polyfill";

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

describe("AnnotationResponseParser", () => {
  test("should parse overall description and move descriptions correctly", async () => {
    const stream = createTestStream([
      "Overall game ",
      "description.\n\n1. e4 {White's move} e5 {Black's move}",
    ]);

    const parser = ResponseParser.parse(stream);
    const result = [];
    for await (let item of parser) {
      result.push(item);
    }

    expect(result).toEqual([
      { description: "Overall game description." },
      { color: "white", move: "e4", description: "White's move" },
      { color: "black", move: "e5", description: "Black's move" },
    ]);
  });

  test("should handle missing comments", async () => {
    const stream = createTestStream(["Overall game description.\n\n1. e4 e5"]);

    const parser = ResponseParser.parse(stream);
    const result = [];
    for await (let item of parser) {
      result.push(item);
    }

    expect(result).toEqual([
      { description: "Overall game description." },
      { color: "white", move: "e4", description: "" },
      { color: "black", move: "e5", description: "" },
    ]);
  });

  test("should throw error for malformed input", async () => {
    const stream = createTestStream([
      "Overall game description.\n\n1. ",
      "e4 {White's move} e5",
    ]);

    const parser = ResponseParser.parse(stream);
    const result = [];
    await expect(async () => {
      for await (let item of parser) {
        result.push(item);
      }
    }).rejects.toThrow("Expected comment open or next move");
  });
});
