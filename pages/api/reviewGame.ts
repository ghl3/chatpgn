// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import {
  exampleQuery,
  exampleResponse,
  systemPrompt,
} from "@/utils/gameReviewPrompts";

const dummyResult = {
  overallDescription: "This game was a draw.",
  moveDescriptions: [
    {
      index: 1,
      move: "d4",
      description: "ghlewis opens with d4, a Queen's Pawn Opening.",
    },
    {
      index: 2,
      move: "d5",
      description: "Black responds symmetrically with d5.",
    },
    {
      index: 3,
      move: "Nc3",
      description: "ghlewis develops his knight to attack the pawn on d5.",
    },
    {
      index: 4,
      move: "Bf4",
      description: "Black develops the bishop to defend the pawn on d5.",
    },
    {
      index: 5,
      move: "Nf3",
      description: "ghlewis develops his knight to attack the bishop on d6.",
    },
    {
      index: 6,
      move: "e3",
      description: "Black retreats the bishop to e6.",
    },
    {
      index: 7,
      move: "Ne5",
      description: "ghlewis moves the knight to attack the weak f7 square.",
    },
    {
      index: 8,
      move: "Bd3",
      description: "Black develops the bishop to d6, defending the f8 square.",
    },
    {
      index: 9,
      move: "dxc5",
      description:
        "ghlewis captures the pawn on d5 with his pawn, opening up the center.",
    },
    {
      index: 10,
      move: "fxe5",
      description: "Black captures back with the knight.",
    },
    {
      index: 11,
      move: "Qh5",
      description: "ghlewis moves his queen to attack the pawn on h7.",
    },
    {
      index: 12,
      move: "Qh3",
      description: "Black moves the pawn to h6 to defend the pawn on h7.",
    },
    {
      index: 13,
      move: "O-O-O",
      description:
        "ghlewis castles queenside, bringing his king to safety and connecting his rooks.",
    },
    {
      index: 14,
      move: "Rd3",
      description:
        "ghlewis moves his rook to the d-file, preparing to double his rooks and attack the open d-file.",
    },
    {
      index: 15,
      move: "Rf3",
      description: "Black moves the queen to g7 to defend the pawn on h6.",
    },
    {
      index: 16,
      move: "g4",
      description:
        "ghlewis pushes his pawn to g4, creating a pawn storm on the kingside.",
    },
    {
      index: 17,
      move: "Nxd5",
      description:
        "ghlewis sacrifices his knight to open up lines of attack against the black king.",
    },
    {
      index: 18,
      move: "Nc7+",
      description:
        "ghlewis checks the black king with his knight, forcing the king to move.",
    },
    {
      index: 19,
      move: "Nxa8",
      description: "Black captures the knight with his bishop.",
    },
    {
      index: 20,
      move: "Nc7+",
      description: "ghlewis checks the black king again with his knight.",
    },
    {
      index: 21,
      move: "Qxf3",
      description: "Black moves the queen to f7 to defend the pawn on h7.",
    },
    {
      index: 22,
      move: "Qd5+",
      description:
        "ghlewis moves his queen to d5, attacking the f7 pawn and threatening checkmate on h7.",
    },
    {
      index: 23,
      move: "Qxf7+",
      description: "Black captures the queen with the rook.",
    },
    {
      index: 24,
      move: "Nd5",
      description: "ghlewis moves his knight to attack the black rook on f8.",
    },
    {
      index: 25,
      move: "Re1",
      description: "Black moves the rook to h5, defending the pawn on h6.",
    },
    {
      index: 26,
      move: "Re5",
      description:
        "ghlewis moves his rook to e5, attacking the weak pawn on f5.",
    },
    {
      index: 27,
      move: "Re8+",
      description: "ghlewis checks the black king with his rook.",
    },
    {
      index: 28,
      move: "Re7+",
      description: "ghlewis checks the black king again with his rook.",
    },
    {
      index: 29,
      move: "Rxb7",
      description: "Black captures the pawn on g3 with his rook.",
    },
    {
      index: 30,
      move: "Nf6+",
      description: "ghlewis checks the black king with his knight.",
    },
    {
      index: 31,
      move: "c6",
      description: "Black moves the pawn to c6, preparing to queen a pawn.",
    },
    {
      index: 32,
      move: "Kb1",
      description:
        "ghlewis moves his king to b1, getting his king out of the way of the pawn on c6.",
    },
    {
      index: 33,
      move: "Ra7",
      description:
        "Black moves the rook to c2, attacking the white pawn on c3.",
    },
    {
      index: 34,
      move: "Rxh7#",
      description: "ghlewis delivers a mate with his rook.",
    },
  ],
};

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export type MoveDescription = {
  index: number;
  move: string;
  description: string;
};

const parseGameText = (
  gameText: string
): { moveDescriptions: MoveDescription[]; overallDescription: string } => {
  const moveDescriptions: MoveDescription[] = [];
  const overallDescriptionLines: string[] = [];

  const moveLines = gameText.split("\n");
  const moveRegex = /^(\d+)\. (\S+)\s+(.+)$/;

  let reachedOverallDescription = false;

  for (const line of moveLines) {
    if (!reachedOverallDescription) {
      const match = line.match(moveRegex);
      if (match) {
        moveDescriptions.push({
          index: parseInt(match[1], 10),
          move: match[2],
          description: match[3],
        });
      } else {
        reachedOverallDescription = true;
      }
    }

    if (reachedOverallDescription) {
      overallDescriptionLines.push(line.trim());
    }
  }

  return {
    moveDescriptions,
    overallDescription: overallDescriptionLines.join("\n"),
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", method: req.method });
    return;
  }

  const { pgn, debug } = req.body;

  if (debug) {
    res.status(200).json(dummyResult);
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      n: 1,
      max_tokens: 2048,
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user", content: exampleQuery() },
        { role: "assistant", content: exampleResponse() },
        { role: "user", content: pgn },
      ],
    });

    if (completion.data.choices[0].message?.content === undefined) {
      console.error("Completion response is missing content");
      res.status(500).json({
        error: "Completion response is missing content",
        details: completion.data.choices[0],
      });
      return;
    }

    const response = completion.data.choices[0].message.content;

    try {
      //const annotatedPgn = convertToPgn(response);
      // TODO: Parase to moves
      const { moveDescriptions, overallDescription } = parseGameText(response);

      res.status(200).json({ response, moveDescriptions, overallDescription });
    } catch (pgnError) {
      console.error("PGN conversion error:", pgnError);
      res.status(500).json({
        error: "PGN conversion error",
        details: { response, pgnError },
      });
    }
  } catch (error) {
    console.error("An unknown error occurred:", error);
    res.status(500).json({
      error: "An unknown error occurred",
      details: { errorMessage: (error as Error).message },
    });
  }
}
