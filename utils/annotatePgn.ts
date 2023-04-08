// utils/annotatePgn.ts

import axios from "axios";
import { ParsedPGN } from "pgn-parser";

export const annotatePgn = async (
  input: ParsedPGN,
  persona: string
): Promise<ParsedPGN> => {
  try {
    const response = await axios.post("/api/annotatePgn", {
      pgn: input,
      persona: persona,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to annotate pgn");
  }
};
