// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Persona } from "../../utils/persona";
import { Configuration, OpenAIApi } from "openai";
import { systemPrompt } from "@/utils/prompts";
import { pgnToString } from "@/utils/pgnToString";
import { parseGame, ParseTree } from "@mliebelt/pgn-parser";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const convertToPgn = (chatResponse: string): ParseTree => {
  return parseGame(chatResponse);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", method: req.method });
    return;
  }

  const pgn: ParseTree = req.body.pgn;
  const persona: Persona = req.body.persona;
  console.log("Received request for PGN annotation with Persona:", persona);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      n: 1,
      max_tokens: 2048,
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt(persona) },
        { role: "user", content: pgnToString(pgn) },
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
      const annotatedPgn = convertToPgn(response);
      res.status(200).json({ pgn: annotatedPgn });
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
