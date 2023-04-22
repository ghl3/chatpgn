import * as MoveSelection from "./MoveSelection";

const RUY_LOPEZ = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
];

const RUY_LOPEZ_WHITE = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
];

test('getPositionsforPlayer w', () => {

    const game = {
        id: "", white: "foobar", black: "baz", date: "", pgn: "",
        fens: RUY_LOPEZ
    };

    expect(MoveSelection.getPositionsForPlayer(game, "foobar"))
        .toStrictEqual([
            { game: game, moveIdx: "0", turn: "w", fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
            { game: game, moveIdx: "2", turn: "w", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" },
            { game: game, moveIdx: "4", turn: "w", fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3" }]);
});

test('getPositionsforPlayer b', () => {

    const game = {
        id: "", white: "foobar", black: "baz", date: "", pgn: "",
        fens: RUY_LOPEZ
    };

    expect(MoveSelection.getPositionsForPlayer(game, "baz"))
        .toStrictEqual([
            { game: game, moveIdx: "1", turn: "b", fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1" },
            { game: game, moveIdx: "3", turn: "b", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" },
            { game: game, moveIdx: "5", turn: "b", fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3" }]);
});

test('getRandomAcceptablePosition moveIdx===2', () => {

    const game = {
        id: "", white: "foobar", black: "baz", date: "", pgn: "",
        fens: RUY_LOPEZ
    };

    expect(MoveSelection.getRandomAcceptablePosition(game, "foobar", (p) => p.moveIdx === "2"))
        .toStrictEqual({ game: game, moveIdx: "2", turn: "w", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" }
        );
});

test('getRandomAcceptablePosition noAcceptablePosition', () => {

    const game = {
        id: "", white: "foobar", black: "baz", date: "", pgn: "",
        fens: RUY_LOPEZ
    };

    expect(MoveSelection.getRandomAcceptablePosition(game, "foobar", (p) => p.moveIdx === "20"))
        .toStrictEqual(null
        );
});


test('getRandomAcceptablePositionFromGames moveIdx===2', () => {

    const game = {
        id: "", white: "foobar", black: "baz", date: "", pgn: "",
        fens: RUY_LOPEZ
    };

    expect(MoveSelection.getRandomAcceptablePositionFromGames([game], "foobar", (p) => p.moveIdx === "2"))
        .toStrictEqual({ game: game, moveIdx: "2", turn: "w", fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2" }
        );
});

