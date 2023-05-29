import parser from "./grammar.pegjs";

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
  move_number?: number;
  move?: string;
  nags?: string[];
  ravs?: RAV[];
  comments?: Comment[];
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

export const parse = (s: string): Game => parser.parse(s);

export const parseMoves = (s: string): Move[] =>
  parser.parse(s, { startRule: "movetext" });
