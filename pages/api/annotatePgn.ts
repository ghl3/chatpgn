// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ParsedPGN } from "pgn-parser";

const examplePgn: ParsedPGN = {
  comments_above_header: null,
  headers: [
    { name: "Event", value: "F/S Return Match" },
    { name: "Site", value: "Belgrade, Serbia JUG" },
    { name: "Date", value: "1992.11.04" },
    { name: "Round", value: "29" },
    { name: "White", value: "Fischer, Robert J." },
    { name: "Black", value: "Spassky, Boris V." },
    { name: "Result", value: "1/2-1/2" },
  ],
  comments: null,
  moves: [
    { move: "e4", comments: [], move_number: 1 },
    { move: "e5", comments: [] },
    {
      move: "Nf3",
      comments: ["This is the Knight's Opening."],
      move_number: 2,
    },
    { move: "Nc6", comments: [] },
    { move: "Bb5", comments: ["The Ruy Lopez Opening."], move_number: 3 },
    { move: "a6", comments: [] },
    { move: "Ba4", comments: [], move_number: 4 },
    { move: "Nf6", comments: [] },
    { move: "O-O", comments: [], move_number: 5 },
    { move: "Be7", comments: [] },
    { move: "Re1", comments: [], move_number: 6 },
    { move: "b5", comments: [] },
    { move: "Bb3", comments: ["The bishop retreats."], move_number: 7 },
    { move: "d6", comments: [] },
    { move: "c3", comments: [], move_number: 8 },
  ],
  result: "1/2-1/2",
};

const API_KEY = "your-api-key-here";
const CHATGPT_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

const generatePrompt = (pgn: ParsedPGN): string => {
  // Add your custom business logic here to generate the prompt
  return "My Prompt";
};

const convertToPgn = (chatResponse: string): ParsedPGN => {
  return examplePgn;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const parsedPgn: ParsedPGN = req.body.input;

      const prompt = generatePrompt(parsedPgn);

      console.log("FOOBAR");

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
