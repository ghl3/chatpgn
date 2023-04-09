// utils/annotatePgn.ts

import axios, { AxiosError } from "axios";
import { ParseTree } from "@mliebelt/pgn-parser";
import { Persona } from "./persona";

export const annotatePgn = async (
  input: ParseTree,
  persona: Persona
): Promise<ParseTree> => {
  try {
    const response = await axios.post("/api/annotatePgn", {
      pgn: input,
      persona: persona,
    });
    return response.data.pgn;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.error);
    }
    throw new Error("Failed to annotate pgn");
  }
};
