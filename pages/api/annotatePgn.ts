// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedPGN } from "pgn-parser";
import { Persona } from "../../utils/persona";
import { fischer_spassky } from "@/utils/pgns";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//const API_KEY = process.env.OPENAI_KEY;
//const CHATGPT_API_URL =
//  "https://api.openai.com/v1/engines/davinci-codex/completions";

const generatePrompt = (pgn: ParsedPGN, persona: string): string => {
  // Add your custom business logic here to generate the prompt
  return "My Prompt";
};

/*
openai.ChatCompletion.create(
  (model = "gpt-3.5-turbo"),
  (messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Who won the world series in 2020?" },
    {
      role: "assistant",
      content: "The Los Angeles Dodgers won the World Series in 2020.",
    },
    { role: "user", content: "Where was it played?" },
  ])
);
*/

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
        res.status(200).json(convertToPgn(completion.data.choices[0].text));
      }

      res.status(200).json(convertToPgn(prompt));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.name, error.message, error.cause); //. error);
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
