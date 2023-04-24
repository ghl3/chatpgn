import {
  MoveDescription,
  parseGameText,
  ReviewedGame,
  parseMoveDescription,
} from "./ReviewedGame";

describe("parseMoveDescription", () => {
  test("parses a move with description", () => {
    const expected: MoveDescription = {
      color: "white",
      move: "e4",
      description: "Morphy moves the pawn",
    };

    expect(parseMoveDescription("e4 {Morphy moves the pawn}", "white")).toEqual(
      expected
    );
  });

  test("returns an empty move description if the input is invalid", () => {
    const moveWithDescription = "invalid move text";
    const expected: MoveDescription = {
      color: "white",
      move: "",
      description: "",
    };

    expect(parseMoveDescription(moveWithDescription, "white")).toEqual(
      expected
    );
  });
});

describe("parseGameText", () => {
  test("parses game text into a ReviewedGame object", () => {
    const gameText = `1. e4 {Paul Morphy plays e4} e5 {Duke responds symmetrically with e5}
2. Nf3 {Morphy plays the Knight to f3.} Nc6 {Isouard develops his Knight to c6.}

Overall, this game is a brilliant example of Paul Morphy's attacking style.`;

    const expected: ReviewedGame = {
      turnDescriptions: [
        {
          white: {
            color: "white",
            move: "e4",
            description: "Paul Morphy plays e4",
          },
          black: {
            color: "black",
            move: "e5",
            description: "Duke responds symmetrically with e5",
          },
        },
        {
          white: {
            color: "white",
            move: "Nf3",

            description: "Morphy plays the Knight to f3.",
          },
          black: {
            color: "black",
            move: "Nc6",
            description: "Isouard develops his Knight to c6.",
          },
        },
      ],
      overallDescription:
        "Overall, this game is a brilliant example of Paul Morphy's attacking style.",
    };

    expect(parseGameText(gameText)).toEqual(expected);
  });
});
