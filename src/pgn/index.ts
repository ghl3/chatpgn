import pegjs from "peggy";
import grammar from "./grammar.pegjs";

const parser = pegjs.generate(grammar);

export const parse = (s: string) => parser.parse(s);
export default {
  parse,
};
