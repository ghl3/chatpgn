import * as Description from "./Descriptions";

test('getColorIndependentScore w', () => {
    expect(Description.getColorIndependentScore('w',
        2.5)
    ).toStrictEqual(2.5);
});

test('getColorIndependentScore b', () => {
    expect(Description.getColorIndependentScore('b',
        2.5)
    ).toStrictEqual(-2.5);
});

test('doesMoveMaintainForcedMateFor yes', () => {
    expect(Description.doesMaintainForcedMateFor(
        { depth: 0, forced_mate: { for: 'PLAYER', in: 5 } },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } })
    ).toStrictEqual(true);
});

test('doesMoveMaintainForcedMateFor no', () => {
    expect(Description.doesMaintainForcedMateFor(
        { depth: 0, score: 50.5 },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } })
    ).toStrictEqual(false);
});

test('doesMoveMaintainForcedMateFor null', () => {
    expect(Description.doesMaintainForcedMateFor(
        { depth: 0, score: 10.5 },
        { depth: 0, score: 50.5 })
    ).toStrictEqual(null);
});

test('doesMoveMaintainForcedMateAgainst yes', () => {
    expect(Description.doesMaintainForcedMateAgainst(
        { depth: 0, forced_mate: { for: 'OPPONENT', in: 5 } },
        { depth: 0, forced_mate: { for: 'OPPONENT', in: 10 } })
    ).toStrictEqual(true);
});

test('doesMoveMaintainForcedMateFor yes', () => {
    expect(Description.doesMaintainForcedMateFor(
        { depth: 0, forced_mate: { for: 'PLAYER', in: 5 } },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } })
    ).toStrictEqual(true);
});

test('doesBlunderForcedMateAgainst yes', () => {
    expect(Description.doesBlunderForcedMateAgainst(
        { depth: 0, forced_mate: { for: 'OPPONENT', in: 10 } },
        { depth: 0, score: 10 })
    ).toStrictEqual(true);
});

test('doesBlunderForcedMateAgainst yes from mate', () => {
    expect(Description.doesBlunderForcedMateAgainst(
        { depth: 0, forced_mate: { for: 'OPPONENT', in: 10 } },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } })
    ).toStrictEqual(true);
});

test('doesBlunderForcedMateAgainst no', () => {
    expect(Description.doesBlunderForcedMateAgainst(
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } })
    ).toStrictEqual(false);
});

test('doesMaintainAdvantage yes forced mate', () => {
    expect(Description.doesMaintainAdvantage('w',
        { depth: 0, forced_mate: { for: 'PLAYER', in: 10 } },
        { depth: 0, forced_mate: { for: 'PLAYER', in: 5 } })
    ).toStrictEqual(true);
});

test('doesMaintainAdvantage white score yes', () => {
    expect(Description.doesMaintainAdvantage('w',
        { depth: 0, score: 10 },
        { depth: 0, score: 100 })
    ).toStrictEqual(true);
});

test('doesMaintainAdvantage white score no', () => {
    expect(Description.doesMaintainAdvantage('w',
        { depth: 0, score: -100 },
        { depth: 0, score: 100 })
    ).toStrictEqual(false);
});

test('doesMaintainAdvantage black score yes', () => {
    expect(Description.doesMaintainAdvantage('b',
        { depth: 0, score: -10 },
        { depth: 0, score: -100 })
    ).toStrictEqual(true);
});

test('doesMaintainAdvantage black score no', () => {
    expect(Description.doesMaintainAdvantage('b',
        { depth: 0, score: 100 },
        { depth: 0, score: -100 })
    ).toStrictEqual(false);
});

test('doesMaintainAdvantage no forced mate', () => {
    expect(Description.doesMaintainAdvantage('w',
        { depth: 0, forced_mate: { for: "OPPONENT", in: 10 } },
        { depth: 0, score: 100 })
    ).toStrictEqual(false);
});

test('doesMaintainDraw yes', () => {
    expect(Description.doesMaintainDraw(
        { depth: 0, score: 0 },
        { depth: 0, score: 0 })
    ).toStrictEqual(true);
});

test('doesMaintainDraw false', () => {
    expect(Description.doesMaintainDraw(
        { depth: 0, score: -100 },
        { depth: 0, score: 0 })
    ).toStrictEqual(false);
});

test('doesMaintainDraw null', () => {
    expect(Description.doesMaintainDraw(
        { depth: 0, score: -100 },
        { depth: 0, score: -50 })
    ).toStrictEqual(null);
});

test('getMoveScoreDelta w nonzero', () => {
    expect(Description.getMoveScoreDelta(
        'w',
        { depth: 0, score: -100 },
        { depth: 0, score: -50 })
    ).toStrictEqual(50);
});

test('getMoveScoreDelta w zero', () => {
    expect(Description.getMoveScoreDelta(
        'w',
        { depth: 0, score: -100 },
        { depth: 0, score: -100 })
    ).toStrictEqual(0);
});

test('getMoveScoreDelta b nonzero', () => {
    expect(Description.getMoveScoreDelta(
        'b',
        { depth: 0, score: -50 },
        { depth: 0, score: -100 })
    ).toStrictEqual(50);
});

test('getMoveScoreDelta b zero', () => {
    expect(Description.getMoveScoreDelta(
        'b',
        { depth: 0, score: -100 },
        { depth: 0, score: -100 })
    ).toStrictEqual(0);
});

test('getMoveScoreDelta null', () => {
    expect(Description.getMoveScoreDelta(
        'b',
        { depth: 0, score: -100 },
        { depth: 0, forced_mate: { in: 10, for: "OPPONENT" } })
    ).toStrictEqual(null);
});

test('makeMoveDescription best move forced mate', () => {
    expect(Description.makeMoveDescription(
        { from: "e6", to: "e7", color: "w" },
        { depth: 0, forced_mate: { in: 10, for: "PLAYER" } },
        {
            fen: "", color: "w", best_moves: [
                {
                    move: { from: "e6", to: "e7", color: "w" },
                    evaluation: { depth: 0, forced_mate: { in: 10, for: "PLAYER" } }
                }
            ]
        }
    )).toStrictEqual({
        "blundersForcedMateAgainst": false,
        "isBestMove": true,
        "isDraw": false,
        "isGoodMove": true,
        "maintainsAdvantage": true,
        "maintainsDraw": null,
        "maintainsForcedMateAgainst": null,
        "maintainsForcedMateFor": true,
        "moveIsForcedMateForOpponent": false,
        "moveIsForcedMateForPlayer": true,
        "moveScore": null,
        "scoreDelta": null,
    });
});

test('makeMoveDescription second best from forced mate', () => {
    expect(Description.makeMoveDescription(
        { from: "e6", to: "e8", color: "w" },
        { depth: 0, score: 100 },
        {
            fen: "", color: "w", best_moves: [
                {
                    move: { from: "e6", to: "e7", color: "w" },
                    evaluation: { depth: 0, forced_mate: { in: 10, for: "PLAYER" } }
                },
                {
                    move: { from: "e6", to: "e8", color: "w" },
                    evaluation: { depth: 0, score: 100 },
                }
            ]
        }
    )).toStrictEqual({
        "blundersForcedMateAgainst": false,
        "isBestMove": false,
        "isDraw": false,
        "isGoodMove": false,
        "maintainsAdvantage": true,
        "maintainsDraw": null,
        "maintainsForcedMateAgainst": null,
        "maintainsForcedMateFor": false,
        "moveIsForcedMateForOpponent": false,
        "moveIsForcedMateForPlayer": false,
        "moveScore": 100,
        "scoreDelta": null,
    });
});

test('makeMoveDescription not top move', () => {
    expect(Description.makeMoveDescription(
        { from: "e6", to: "e1", color: "w" },
        { depth: 0, score: -150 },
        {
            fen: "", color: "w", best_moves: [
                {
                    move: { from: "e6", to: "e7", color: "w" },
                    evaluation: { depth: 0, score: 100 }
                },
                {
                    move: { from: "e6", to: "e8", color: "w" },
                    evaluation: { depth: 0, score: -100 },
                }
            ]
        }
    )).toStrictEqual({
        "blundersForcedMateAgainst": false,
        "isBestMove": false,
        "isDraw": false,
        "isGoodMove": false,
        "maintainsAdvantage": false,
        "maintainsDraw": null,
        "maintainsForcedMateAgainst": null,
        "maintainsForcedMateFor": null,
        "moveIsForcedMateForOpponent": false,
        "moveIsForcedMateForPlayer": false,
        "moveScore": -150,
        "scoreDelta": 250,
    });
});
