import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { CreateCompletionRequest } from "openai";

export async function OpenAIStream(payload: CreateCompletionRequest) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  let res: Response;
  try {
    res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Log the error and re-throw to exit the function
    console.error("Error making request to OpenAI API:", error);
    throw error;
  }

  // Check if the fetch request was successful
  if (!res.ok) {
    // The request was not successful, try to parse and log the error message
    try {
      const errorBody = await res.json();
      console.error("OpenAI API returned an error:", errorBody);
    } catch (parseError) {
      console.error(
        "Could not parse error response from OpenAI API:",
        parseError
      );
    }
    // Re-throw an error to exit the function
    throw new Error(`OpenAI API request failed with status ${res.status}`);
  }

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === `[DONE]`) {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const { index, finish_reason, delta } = json.choices[0];

            if (finish_reason != null) {
              return;
            }
            if (delta?.role != null) {
              // Skip the role identification message
              return;
            }
            const text = delta?.content;
            if (text == null) {
              return;
            }

            const chunk = encoder.encode(text);
            controller.enqueue(chunk);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
