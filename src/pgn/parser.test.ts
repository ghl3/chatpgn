import * as pgnParser from "./parser";

describe("PGN Parser", () => {
  it("parses full PGN correctly", () => {
    const pgn =
      '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *';
    const result = pgnParser.parse(pgn);

    console.log(result);
  });

  it("parses annotation style PGN", () => {
    const pgn =
      "{This was a great game}\n1. e4 {Take the center} e5 {Counter the center}\n2. Nf3 Nc6 {More knights}\n";

    //const pgn =
    //  "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *";

    const result = pgnParser.parse(pgn);

    console.log(result);
  });

  it("parses simple PGN correctly", () => {
    //var parser = peg.generate("start = ('a' / 'b')+");

    const pgn = "1. e4 e5 2. Nf3 Nc6";
    const result = pgnParser.parse(pgn);

    console.log(result);

    expect(result).toEqual({
      comments_above_header: null,
      headers: null,
      comments: null,
      moves: [
        { move_number: 1, move: "e4", comments: [] },
        { move: "e5", comments: [] },
        { move_number: 2, move: "Nf3", comments: [] },
        { move: "Nc6", comments: [] },
      ],
      result: null,
    });
  });

  it("throws an error on invalid PGN", () => {
    // var parser = peg.generate("start = ('a' / 'b')+");

    const invalidPgn = "1. e5 Nf3 foobar";

    expect(() => pgnParser.parse(invalidPgn)).toThrow();
  });

  it("parses moves correctly", () => {
    //var parser = peg.generate("start = ('a' / 'b')+");

    const pgn = "1. e4 {comment 1} e5 {comment 2}";
    const result = pgnParser.parseMoves(pgn);

    console.log(result);

    expect(result).toEqual([
      { comments: [{ text: "comment 1" }], move: "e4", move_number: 1 },
      { comments: [{ text: "comment 2" }], move: "e5" },
    ]);
  });
});
