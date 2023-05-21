import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { Game } from "@/chess/Game";
import { Engine } from "@/engine/Engine";
import { EVALUATED_GAME as OPERA_EVALUATED_GAME } from "@/data/games/OperaGame";

export const evaluateGame = async (
  game: Game,
  engine: Engine,
  debug: boolean = false
): Promise<EvaluatedGame> => {
  if (debug) {
    return OPERA_EVALUATED_GAME;
  }

  const evaluatedPositions: EvaluatedPosition[] = [];
  for (const position of game.positions) {
    const evaluatedPosition = await engine.evaluatePosition(position.fen);
    console.log("Evaluated position", evaluatedPosition);
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
