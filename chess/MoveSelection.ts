import { Game } from "./Game";
import { GamePosition } from "./GamePosition";

type PositionSelector = (position: GamePosition) => boolean;

const getRandomItem = <T>(items: T[]): T | null => {

    if (items.length === 0) {
        return null;
    }

    const randomKey = Math.floor(Math.random() * items.length);
    return items[randomKey];
}

export const getPositionsForPlayer = (game: Game, player: string): GamePosition[] => {

    var playerColor = null;
    if (game.white.toLowerCase() === player.toLowerCase()) {
        playerColor = 'w';
    } else if (game.black.toLowerCase() === player.toLowerCase()) {
        playerColor = 'b';
    } else {
        return [];
    }

    const positionsForPlayer: GamePosition[] = [];

    for (const position of game.positions) {
        if (position.moveIndex.turn === playerColor) {
            positionsForPlayer.push({ game: game, position: position });
        }
    }

    return positionsForPlayer;
}

export const getRandomAcceptablePosition = (game: Game, player: string, isAcceptablePosition: PositionSelector): GamePosition | null => {

    // First, we get all positions in the game for the given player
    const positions: GamePosition[] = getPositionsForPlayer(game, player).filter(isAcceptablePosition);

    if (positions.length === 0) {
        return null;
    } else {
        return getRandomItem(positions);
    }
}



