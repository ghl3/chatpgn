// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ParsedPGN } from "pgn-parser";
import { Persona } from "../../utils/persona";
import { fischer_spassky } from "@/utils/pgns";

const API_KEY = "your-api-key-here";
const CHATGPT_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

const generatePrompt = (pgn: ParsedPGN, persona: string): string => {
  // Add your custom business logic here to generate the prompt
  return "My Prompt";
};

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

      console.log("Input PGN:", pgn); // Log the input PGN
      console.log("Persona:", persona); // Log the persona

      const prompt = generatePrompt(pgn, persona);

      /*
      const response = await axios.post(
        CHATGPT_API_URL,
        { prompt, max_tokens: 100 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      res.status(200).json(response.data.choices[0].text.trim());
      */
      res.status(200).json(convertToPgn(prompt));
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
