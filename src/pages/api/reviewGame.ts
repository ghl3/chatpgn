// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { generatePromptMessages } from "@/review/prompts";
import { createEvaluatedPgn } from "@/review/PgnUtils";
import { OpenAIStream } from "@/utils/OpenAiStream";
//import { OpenAIStream } from "@/utils/OpenAiStream";

//export const config = {
//  runtime: "edge",
//};

//const configuration = new Configuration({
//  apiKey: process.env.OPEN_AI_KEY,
//});
//const openai = new OpenAIApi(configuration);

// const model = 'gpt-3.5-turbo';
const model = "gpt-4";

const fetchOpenAiCompletion = async (promptMessages: any[]): Promise<any> => {
  const payload = {
    model: model,
    n: 1,
    // The max number of tokens it the number of tokens for the completion.
    // The max number of tokens for the prompt messages plus the completion
    // is 4097.
    // So, max tokens below must be defined such that, when added to the number
    // of tokens in the message, it doesn't exceed 4097.
    max_tokens: 2048,
    temperature: 0.5,
    messages: promptMessages,
    stream: true,
  };

  //const completion = await openai.createChatCompletion(payload, {
  //  responseType: "stream",
  //});
  //return completion;

  const stream = await OpenAIStream(payload);
  return stream;
};

// TODO: Make this a streaming edge function
// copy: https://github.com/StephDietz/watch-this/blob/95f7c74f7c89256efa765ffb93d7702650536ce7/src/routes/api/getRecommendation/%2Bserver.ts#L2
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.error("Method not allowed:", req.method);
    res.status(405).json({ error: "Method not allowed", method: req.method });
    return;
  }

  const { evaluatedGame, debug } = req.body;
  //const { evaluatedGame, debug } = await req.json();

  /*
  if (debug) {
    const response = OPERA_RESPONSE;
    const reviewedGame: ReviewedGame = parseGameText(response);
    res.status(200).json({ response, reviewedGame });
    return;
  }
  */

  const pgn: string = createEvaluatedPgn(evaluatedGame);

  const promptMessages = generatePromptMessages(pgn);

  let completion;
  try {
    completion = await fetchOpenAiCompletion(promptMessages);
  } catch (apiError) {
    console.error("OpenAI API error:", apiError);
    res.status(500).json({
      message: "Error occurred while calling OpenAI API",
    });
    return;
  }

  res.status(200);
  completion.pipe(res);
  //res.pipe(completion);

  /*
  const response = completion.data.choices[0].message.content;
  try {
    const reviewedGame = parseGameText(response);
    // TODO: Validate that the number of annotations matches the
    // number of moves (or otherwise handle this case).
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
    return;
  }
  */
}
