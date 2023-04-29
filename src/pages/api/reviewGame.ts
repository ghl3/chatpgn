// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { OPERA_RESPONSE, generatePromptMessages } from "@/review/prompts";
import { ReviewedGame, parseGameText } from "@/review/ReviewedGame";
import { createEvaluatedPgn } from "@/review/PgnUtils";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", method: req.method });
    return;
  }

  const { evaluatedGame, debug } = req.body;

  const pgn: string = createEvaluatedPgn(evaluatedGame);

  if (debug) {
    const response = OPERA_RESPONSE;
    const reviewedGame: ReviewedGame = parseGameText(response);
    res.status(200).json({ response, reviewedGame });
    return;
  }

  try {
    const promptMessages = generatePromptMessages(pgn);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      n: 1,
      max_tokens: 2048,
      temperature: 0.5,
      messages: promptMessages,
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
      // TODO: handle 'continue'
      const reviewedGame = parseGameText(response);

      res.status(200).json({
        promptMessages,
        response,
        reviewedGame,
      });
    } catch (pgnError) {
      console.error("PGN conversion error:", pgnError);
      res.status(500).json({
        error: "PGN conversion error",
        details: { response, pgnError },
      });
    }
  } catch (error) {
    console.error("An unknown error occurred:", error);
    res.status(500).json(error);
  }
}
