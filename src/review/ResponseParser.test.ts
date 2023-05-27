import { ResponseParser } from "./ResponseParser";
import { TextEncoder } from "text-encoding";
import { ReadableStream } from "web-streams-polyfill";

describe("AnnotationResponseParser", () => {
  test("should parse overall description and move descriptions correctly", async () => {
    const sampleInput = new TextEncoder().encode(
      "Overall game description.\n\n1. e4 {White's move} e5 {Black's move}"
    );
    const sampleReadableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(sampleInput);
        controller.close();
      },
    });

    const parser = ResponseParser.parse(sampleReadableStream);
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
    const sampleInput = new TextEncoder().encode(
      "Overall game description.\n\n1. e4 e5"
    );
    const sampleReadableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(sampleInput);
        controller.close();
      },
    });

    const parser = ResponseParser.parse(sampleReadableStream);
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
    const sampleInput = new TextEncoder().encode(
      "Overall game description.\n\n1. e4 {White's move} e5"
    );
    const sampleReadableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(sampleInput);
        controller.close();
      },
    });

    const parser = ResponseParser.parse(sampleReadableStream);
    const result = [];
    await expect(async () => {
      for await (let item of parser) {
        result.push(item);
      }
    }).rejects.toThrow("Expected comment open or next move");
  });
});
