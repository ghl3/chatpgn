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

const fetchOpenAiCompletion = async (promptMessages: any[]): Promise<any> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    n: 1,
    max_tokens: 2048,
    temperature: 0.5,
    messages: promptMessages,
  });

  return completion;
};

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

  const promptMessages = generatePromptMessages(pgn);
  let completion;

  try {
    completion = await fetchOpenAiCompletion(promptMessages);
  } catch (apiError) {
    console.error("OpenAI API error:", apiError);
    res.status(500).json({
      message: "Error occurred while calling OpenAI API",
      error: apiError,
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
    return;
  } catch (pgnError) {
    console.error("PGN conversion error:", pgnError);
    res.status(500).json({
      message: "PGN conversion error",
      error: pgnError,
    });
  }
}
