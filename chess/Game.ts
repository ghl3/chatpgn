// Format: 'yyyy-MM-dd'

import { YearMonth } from "../utils/YearMonth";
import { Position } from "./Position";

// TODO: Add type checking here
export type YearMonthDay = string;

export interface Game {
  id: string;
  white: string;
  black: string;
  date: YearMonthDay;
  positions: Position[];
}

export class GameUtil {
  // Returns a string representing the year/month
  static yearMonthString = (game: Game): YearMonth => {
    return game.date.split("-").slice(0, 2).join("-");
  };
}
