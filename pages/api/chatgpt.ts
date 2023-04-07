// pages/api/chatgpt.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = "your-api-key-here";
const CHATGPT_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const prompt = req.body.prompt;

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
