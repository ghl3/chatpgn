import pegjs from "peggy";

import grammar from "./grammar.pegjs";

//import fs from "fs";
//import { path as rootPath } from "app-root-path";

//const grammar = fs.readFileSync(`${rootPath}/src/pgn/grammar.pegjs`, "utf-8");

const parser = pegjs.generate(grammar);

export const parse = (s: string) => parser.parse(s);
export default {
  parse,
};
