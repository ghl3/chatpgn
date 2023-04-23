import { EvaluatedPosition } from "./EvaluatedPosition";
import { Move } from "./Move";

export interface EvaluatedGame {
  id: string;
  white: string;
  black: string;
  moves: Move[];
  evaluatedPositions: EvaluatedPosition[];
}
