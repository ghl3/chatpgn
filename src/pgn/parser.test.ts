import * as pgnParser from "./index";

describe("PGN Parser", () => {
  it("parses full PGN correctly", () => {
    const pgn =
      '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *';

    //const pgn =
    //  "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *";

    const result = pgnParser.parse(pgn);

    console.log(result);
  });

  it("parses simple PGN correctly", () => {
    //var parser = peg.generate("start = ('a' / 'b')+");

    const pgn = "(1. e4 e5 2. Nf3 Nc6)";
    const result = pgnParser.parse(pgn);

    expect(result).toEqual({
      game: [
        {
          number: 1,
          white: { piece: "P", destination: "e4" },
          black: { piece: "P", destination: "e5" },
        },
        {
          number: 2,
          white: { piece: "N", destination: "f3" },
          black: { piece: "N", destination: "c6" },
        },
      ],
    });
  });

  it("throws an error on invalid PGN", () => {
    // var parser = peg.generate("start = ('a' / 'b')+");

    const invalidPgn = "1. e5 Nf3";

    expect(() => pgnParser.parse(invalidPgn)).toThrow();
  });
});
