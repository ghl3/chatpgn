import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { Game } from "@/chess/Game";
import { Engine } from "@/engine/Engine";

export const evaluateGame = async (
  game: Game,
  engine: Engine
): Promise<EvaluatedGame> => {
  const evaluatedPositions: EvaluatedPosition[] = [];
  for (const position of game.positions) {
    const evaluatedPosition = await engine.evaluatePosition(position.fen);
    evaluatedPositions.push(evaluatedPosition);
  }
  return {
    id: game.id,
    white: game.white,
    black: game.black,
    moves: game.moves,
    evaluatedPositions,
  };
};
