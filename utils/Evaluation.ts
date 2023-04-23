import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { Game } from "@/chess/Game";
import { Engine } from "@/engine/Engine";

export const evaluateGame = async (
  game: Game,
  engine: Engine
): Promise<EvaluatedPosition[]> => {
  const evaluatedPositions: EvaluatedPosition[] = [];
  for (const position of game.positions) {
    const evaluatedPosition = await engine.evaluatePosition(position.fen);
    evaluatedPositions.push(evaluatedPosition);
  }
  return evaluatedPositions;
};
