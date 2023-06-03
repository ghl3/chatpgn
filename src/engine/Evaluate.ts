import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { Game } from "@/chess/Game";
import { Engine } from "@/engine/Engine";
import { EVALUATED_GAME as OPERA_EVALUATED_GAME } from "@/data/games/OperaGame";

// This function evaluates positions and returns an async stream of EvaluatedPosition objects
export async function* evaluatePositions(
  game: Game,
  engine: Engine,
  debug: boolean = false
): AsyncIterable<EvaluatedPosition> {
  if (debug) {
    yield* OPERA_EVALUATED_GAME.evaluatedPositions;
    return;
  }

  for (const position of game.positions) {
    const evaluatedPosition = await engine.evaluatePosition(position.fen);
    yield evaluatedPosition;
  }
}

// This function returns an evaluated game using the evaluatePositions function
export const evaluateGame = async (
  game: Game,
  engine: Engine,
  debug: boolean = false
): Promise<EvaluatedGame> => {
  if (debug) {
    return OPERA_EVALUATED_GAME;
  }

  const evaluatedPositions: EvaluatedPosition[] = [];
  for await (const evaluatedPosition of evaluatePositions(game, engine)) {
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
