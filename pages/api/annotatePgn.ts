// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedPGN } from "pgn-parser";
import { Persona } from "../../utils/persona";
import { fischer_spassky } from "@/data/parsed_pgns";

import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "@/utils/prompts";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const convertToPgn = (chatResponse: string): ParsedPGN => {
  return fischer_spassky;
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

      const prompt = generatePrompt(pgn, persona);

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
      });

      if (completion.data.choices[0].text === undefined) {
        console.log("NO WAY!");
        res.status(500).json({ error: "NO WAY" });
      } else {
        const response = completion.data.choices[0].text;
        console.log("Response:");
        console.log(response);
        res.status(200).json(convertToPgn(response));
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
