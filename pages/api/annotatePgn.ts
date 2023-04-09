// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Persona } from "../../utils/persona";
import { ParsedPGN, parse } from "pgn-parser";
import { Configuration, OpenAIApi } from "openai";
import { systemPrompt } from "@/utils/prompts";
import { pgnToString } from "@/utils/pgnToString";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const convertToPgn = (chatResponse: string): ParsedPGN => {
  return parse(chatResponse)[0];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const pgn: ParsedPGN = req.body.pgn;
      const persona: Persona = req.body.persona;

      console.log("Annotating PGN with Persona:", persona);

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

      console.log("Got Response:");
      console.log(completion);

      if (completion.data.choices[0].message?.content === undefined) {
        console.log("NO WAY!");
        res.status(500).json({ error: "NO WAY" });
      } else {
        const response = completion.data.choices[0].message?.content;
        console.log("Response:");
        console.log(response);
        const annotatedPgn = convertToPgn(response);
        res.status(200).json({ pgn: annotatedPgn });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.name, error.message, error.cause);
        res.status(500).json({ error: error });
      } else {
        console.log("ERROR B");
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    console.log("ERROR C");
    res.status(405).json({ error: "Method not allowed" });
  }
}
