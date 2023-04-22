// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import {
  exampleQuery,
  exampleResponse,
  systemPrompt,
} from "@/utils/gameReviewPrompts";
import { parseGame, ParseTree } from "@mliebelt/pgn-parser";

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

  const pgn: string = req.body.pgn;

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
