import pegjs from "peggy";
import grammar from "./grammar.pegjs";

export type Game = {
  comments_above_header?: Comment[];
  headers?: Header[];
  comments?: Comment[];
  moves?: Move[];
  result?: string;
};

export type Header = {
  name: string;
  value: string;
};

export type Move = {
  move_number?: number; // Optional move number
  move?: string; // The move text
  nags?: string[]; // Optional array of NAGs
  ravs?: RAV[]; // Optional array of RAVs
  comments?: Comment[]; // Optional comments
};

export type RAV = {
  comments: Comment[];
  moves: Move[];
  result?: string;
};

export type Comment = {
  text?: string;
  commands?: Command[];
};

export type Command = {
  key: string;
  values: string[];
};

const parser = pegjs.generate(grammar);

export const parse = (s: string): Game => parser.parse(s);

export const parseMoves = (s: string): Move[] =>
  parser.parse(s, { startRule: "movetext" });

export default {
  parse,
};
