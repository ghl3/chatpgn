import { createEvaluatedPgn } from "@/review/PgnUtils";
import { generatePromptMessages } from "@/review/prompts";
import { OpenAIStream } from "@/utils/OpenAiStream";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();

    // Check if 'evaluatedGame' is provided
    if (!body.evaluatedGame) {
      return new Response("Missing evaluated game data", { status: 400 });
    }

    const evaluatedGame = body.evaluatedGame;
    const pgn: string = createEvaluatedPgn(evaluatedGame);
    const promptMessages = generatePromptMessages(pgn);

    const model = "gpt-4";
    const payload = {
      model: model,
      n: 1,
      // max_tokens is the number of tokens allowed for the completion.
      // The total number of tokens, including both the prompt and the
      // completion, is 4097.  So, max_tokens below must be defined such
      // that, when added to the number of tokens in the prompt, it doesn't
      // exceed 4097.
      max_tokens: 2048,
      temperature: 0.5,
      messages: promptMessages,
      stream: true,
    };

    console.log(payload);

    // Create a stream of response tokens
    const stream = await OpenAIStream(payload);
    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export default handler;
