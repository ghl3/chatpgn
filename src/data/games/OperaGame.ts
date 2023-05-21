import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { Game } from "@/chess/Game";

export const PGN: string = `
[Event "Casual Game"]
[Site "Le Café de la Régence, Paris FRA"]
[Date "1858.??.??"]
[EventDate "?"]
[Round "?"]
[Result "0-1"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "46"]

1.e4 e5
2.Nf3 d6
3.d4 Bg4
4.dxe5 Bxf3
5.Qxf3 dxe5
6.Bc4 Nf6
7.Qb3 Qe7
8.Nc3 c6
9.Bg5 b5
10.Nxb5 cxb5
11.Bxb5+ Nbd7
12.O-O-O Rd8
13.Rxd7 Rxd7
14.Rd1 Qe6
15.Bxd7+ Nxd7
16.Qb8+ Nxb8
17.Rd8# 0-1`;

export const EVALUATED_PGN: string = `[Event "Casual Game"]
[Site "Le Café de la Régence, Paris FRA"]
[Date "1858.??.??"]
[EventDate "?"]
[Round "?"]
[Result "0-1"]
[White "Paul Morphy"]
[Black "Duke Karl / Count Isouard"]
[ECO "C41"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "46"]

1. e4 {eval before: +0.53, best moves: e4 (+0.53), eval after: +0.07}  e5 {eval before: +0.07, best moves: e6 (+0.07), eval after: +0.95}
2. Nf3 {eval before: +0.95, best moves: Nf3 (+0.95), eval after: +0.09}  d6 {eval before: +0.09, best moves: d6 (+0.09), eval after: +0.59}
3. d4 {eval before: +0.59, best moves: d4 (+0.59), eval after: +0.29}  Bg4 {eval before: +0.29, best moves: exd4 (+0.29), eval after: +1.21}
4. dxe5 {eval before: +1.21, best moves: dxe5 (+1.21), c3 (+1.14), eval after: +0.78}  Bxf3 {eval before: +0.78, best moves: Nd7 (+0.78), eval after: +1.66}
5. Qxf3 {eval before: +1.66, best moves: Qxf3 (+1.66), eval after: +1.13}  dxe5 {eval before: +1.13, best moves: dxe5 (+1.13), eval after: +1.57}
6. Bc4 {eval before: +1.57, best moves: Bc4 (+1.57), eval after: +0.73}  Nf6 {eval before: +0.73, best moves: Qf6 (+0.73), eval after: +1.95}
7. Qb3 {eval before: +1.95, best moves: Qb3 (+1.95), eval after: +1.63}  Qe7 {eval before: +1.63, best moves: Qe7 (+1.63), eval after: +1.93}
8. Nc3 {eval before: +1.93, best moves: Qxb7 (+1.93), eval after: +1.37}  c6 {eval before: +1.37, best moves: c6 (+1.37), eval after: +1.98}
9. Bg5 {eval before: +1.98, best moves: Bg5 (+1.98), eval after: +1.58}  b5 {eval before: +1.58, best moves: Na6 (+1.58), eval after: +2.89}
10. Nxb5 {eval before: +2.89, best moves: Nxb5 (+2.89), eval after: +2.6}  cxb5 {eval before: +2.6, best moves: Qb4+ (+2.6), eval after: +7.47}
11. Bxb5+ {eval before: +7.47, best moves: Bxb5+ (+7.47), eval after: +7.32}  Nbd7 {eval before: +7.32, best moves: Nbd7 (+7.32), eval after: +7.78}
12. O-O-O {eval before: +7.78, best moves: O-O-O (+7.78), eval after: +7.34}  Rd8 {eval before: +7.34, best moves: Qc5 (+7.34), eval after: +9.14}
13. Rxd7 {eval before: +9.14, best moves: Rxd7 (+9.14), eval after: +9.06}  Rxd7 {eval before: +9.06, best moves: Nxd7 (+9.06), eval after: +9.74}
14. Rd1 {eval before: +9.74, best moves: Rd1 (+9.74), eval after: +9.37}  Qe6 {eval before: +9.37, best moves: Qb4 (+9.37), eval after: +14.36}
15. Bxd7+ {eval before: +14.36, best moves: Bxd7+ (+14.36), eval after: +14.29}  Nxd7 {eval before: +14.29, best moves: Qxd7 (+14.29), eval after: Mate in 2 for w}
16. Qb8+ {eval before: Mate in 2 for w, best moves: Qb8+ (Mate in 2 for w), eval after: Mate in 1 for w}  Nxb8 {eval before: Mate in 1 for w, best moves: Nxb8 (Mate in 1 for w), eval after: Mate in 1 for w}
17. Rd8# {eval before: Mate in 1 for w, best moves: Rd8# (Mate in 1 for w), eval after: Mate in 0 for w}
`;

export const RESPONSE: string = `1. e4 {White opens with the king's pawn, aiming to control the center} e5 {Black responds symmetrically, contesting the center}
2. Nf3 {White develops the knight, attacking the e5 pawn} d6 {Black defends the pawn by advancing the d-pawn}
3. d4 {White breaks the pawn chain, challenging the center} Bg4 {Black develops the bishop with a pin on the knight}
4. dxe5 {White captures the pawn, taking advantage of the center} Bxf3 {Black captures the knight, removing a key defender}
5. Qxf3 {White recaptures with the queen, maintaining central pressure} dxe5 {Black recaptures the pawn, opening lines for development}
6. Bc4 {White develops the bishop, targeting the f7 weakness} Nf6 {Black develops the knight, attacking the e4 pawn}
7. Qb3 {White moves the queen, putting pressure on the f7 square} Qe7 {Black defends f7 with the queen, connecting the rooks}
8. Nc3 {White develops the knight, supporting the e4 pawn} c6 {Black prepares to challenge the strong bishop on c4}
9. Bg5 {White pins the f6 knight, creating threats} b5 {Black tries to kick the bishop, but weakens the queenside}
10. Nxb5 {White captures the pawn, exploiting Black's weak move} cxb5 {Black recaptures, but overlooks a tactic}
11. Bxb5+ {White checks with the bishop, winning material} Nbd7 {Black blocks the check, but is now losing}
12. O-O-O {White castles queenside, centralizing the rook} Rd8 {Black tries to challenge the d-file, but it's too late}
13. Rxd7 {White captures the knight, increasing the material advantage} Rxd7 {Black recaptures, hoping for some counterplay}
14. Rd1 {White doubles rooks on the d-file, increasing pressure} Qe6 {Black tries to defend, but the position is lost}
15. Bxd7+ {White captures the rook, delivering check} Nxd7 {Black recaptures, but is now facing mate}
16. Qb8+ {White checks the king, forcing the knight to move} Nxb8 {Black moves the knight, but it's futile}
17. Rd8# {White delivers checkmate, ending the game}

This game featured a sharp battle for the center in the opening.
White played aggressively, exploiting Black's mistakes to gain a decisive advantage.
Black's errors in the middlegame allowed White to win material and eventually deliver checkmate.`;

export const GAME: Game = {
  id: "123456",
  white: "morphy",
  black: "duke",
  positions: [
    {
      color: "w",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    },
    {
      color: "b",
      fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      color: "w",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      color: "b",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      color: "w",
      fen: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    },
    {
      color: "b",
      fen: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    },
    {
      color: "w",
      fen: "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
    },
    {
      color: "b",
      fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    },
    {
      color: "w",
      fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
    },
    {
      color: "b",
      fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
    },
    {
      color: "w",
      fen: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
    },
    {
      color: "b",
      fen: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
    },
    {
      color: "w",
      fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
    },
    {
      color: "b",
      fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
    },
    {
      color: "w",
      fen: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
    },
    {
      color: "b",
      fen: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
    },
    {
      color: "w",
      fen: "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
    },
    {
      color: "b",
      fen: "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
    },
    {
      color: "w",
      fen: "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
    },
    {
      color: "b",
      fen: "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
    },
    {
      color: "w",
      fen: "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
    },
    {
      color: "b",
      fen: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
    },
    {
      color: "w",
      fen: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
    },
    {
      color: "b",
      fen: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
    },
    {
      color: "w",
      fen: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
    },
    {
      color: "b",
      fen: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
    },
    {
      color: "w",
      fen: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
    },
    {
      color: "b",
      fen: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
    },
    {
      color: "w",
      fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
    },
    {
      color: "b",
      fen: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
    },
    {
      color: "w",
      fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
    },
    {
      color: "b",
      fen: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
    },
    {
      color: "w",
      fen: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
    },
    {
      color: "b",
      fen: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
    },
  ],
  moves: [
    {
      color: "w",
      piece: "p",
      from: "e2",
      to: "e4",
      san: "e4",
      flags: "b",
      lan: "e2e4",
      before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      after: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      color: "b",
      piece: "p",
      from: "e7",
      to: "e5",
      san: "e5",
      flags: "b",
      lan: "e7e5",
      before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      color: "w",
      piece: "n",
      from: "g1",
      to: "f3",
      san: "Nf3",
      flags: "n",
      lan: "g1f3",
      before: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      color: "b",
      piece: "p",
      from: "d7",
      to: "d6",
      san: "d6",
      flags: "n",
      lan: "d7d6",
      before: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      after: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    },
    {
      color: "w",
      piece: "p",
      from: "d2",
      to: "d4",
      san: "d4",
      flags: "b",
      lan: "d2d4",
      before: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
      after: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    },
    {
      color: "b",
      piece: "b",
      from: "c8",
      to: "g4",
      san: "Bg4",
      flags: "n",
      lan: "c8g4",
      before: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
      after:
        "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
    },
    {
      color: "w",
      piece: "p",
      from: "d4",
      to: "e5",
      san: "dxe5",
      flags: "c",
      lan: "d4e5",
      before:
        "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
      captured: "p",
    },
    {
      color: "b",
      piece: "b",
      from: "g4",
      to: "f3",
      san: "Bxf3",
      flags: "c",
      lan: "g4f3",
      before:
        "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
      captured: "n",
    },
    {
      color: "w",
      piece: "q",
      from: "d1",
      to: "f3",
      san: "Qxf3",
      flags: "c",
      lan: "d1f3",
      before: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
      captured: "b",
    },
    {
      color: "b",
      piece: "p",
      from: "d6",
      to: "e5",
      san: "dxe5",
      flags: "c",
      lan: "d6e5",
      before: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
      after: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
      captured: "p",
    },
    {
      color: "w",
      piece: "b",
      from: "f1",
      to: "c4",
      san: "Bc4",
      flags: "n",
      lan: "f1c4",
      before: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
      after: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
    },
    {
      color: "b",
      piece: "n",
      from: "g8",
      to: "f6",
      san: "Nf6",
      flags: "n",
      lan: "g8f6",
      before: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
      after: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
    },
    {
      color: "w",
      piece: "q",
      from: "f3",
      to: "b3",
      san: "Qb3",
      flags: "n",
      lan: "f3b3",
      before: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
      after: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
    },
    {
      color: "b",
      piece: "q",
      from: "d8",
      to: "e7",
      san: "Qe7",
      flags: "n",
      lan: "d8e7",
      before: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
      after: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
    },
    {
      color: "w",
      piece: "n",
      from: "b1",
      to: "c3",
      san: "Nc3",
      flags: "n",
      lan: "b1c3",
      before: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
      after: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
    },
    {
      color: "b",
      piece: "p",
      from: "c7",
      to: "c6",
      san: "c6",
      flags: "n",
      lan: "c7c6",
      before:
        "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
      after:
        "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
    },
    {
      color: "w",
      piece: "b",
      from: "c1",
      to: "g5",
      san: "Bg5",
      flags: "n",
      lan: "c1g5",
      before:
        "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
      after:
        "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
    },
    {
      color: "b",
      piece: "p",
      from: "b7",
      to: "b5",
      san: "b5",
      flags: "b",
      lan: "b7b5",
      before:
        "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
      after:
        "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
    },
    {
      color: "w",
      piece: "n",
      from: "c3",
      to: "b5",
      san: "Nxb5",
      flags: "c",
      lan: "c3b5",
      before:
        "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
      after:
        "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
      captured: "p",
    },
    {
      color: "b",
      piece: "p",
      from: "c6",
      to: "b5",
      san: "cxb5",
      flags: "c",
      lan: "c6b5",
      before:
        "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
      after: "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
      captured: "n",
    },
    {
      color: "w",
      piece: "b",
      from: "c4",
      to: "b5",
      san: "Bxb5+",
      flags: "c",
      lan: "c4b5",
      before:
        "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
      after: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
      captured: "p",
    },
    {
      color: "b",
      piece: "n",
      from: "b8",
      to: "d7",
      san: "Nbd7",
      flags: "n",
      lan: "b8d7",
      before: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
      after: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
    },
    {
      color: "w",
      piece: "k",
      from: "e1",
      to: "c1",
      san: "O-O-O",
      flags: "q",
      lan: "e1c1",
      before: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
      after: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
    },
    {
      color: "b",
      piece: "r",
      from: "a8",
      to: "d8",
      san: "Rd8",
      flags: "n",
      lan: "a8d8",
      before: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
      after: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
    },
    {
      color: "w",
      piece: "r",
      from: "d1",
      to: "d7",
      san: "Rxd7",
      flags: "c",
      lan: "d1d7",
      before: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
      after: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
      captured: "n",
    },
    {
      color: "b",
      piece: "r",
      from: "d8",
      to: "d7",
      san: "Rxd7",
      flags: "c",
      lan: "d8d7",
      before: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
      after: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
      captured: "r",
    },
    {
      color: "w",
      piece: "r",
      from: "h1",
      to: "d1",
      san: "Rd1",
      flags: "n",
      lan: "h1d1",
      before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
      after: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
    },
    {
      color: "b",
      piece: "q",
      from: "e7",
      to: "e6",
      san: "Qe6",
      flags: "n",
      lan: "e7e6",
      before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
      after: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
    },
    {
      color: "w",
      piece: "b",
      from: "b5",
      to: "d7",
      san: "Bxd7+",
      flags: "c",
      lan: "b5d7",
      before: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
      after: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
      captured: "r",
    },
    {
      color: "b",
      piece: "n",
      from: "f6",
      to: "d7",
      san: "Nxd7",
      flags: "c",
      lan: "f6d7",
      before: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
      after: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
      captured: "b",
    },
    {
      color: "w",
      piece: "q",
      from: "b3",
      to: "b8",
      san: "Qb8+",
      flags: "n",
      lan: "b3b8",
      before: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
      after: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
    },
    {
      color: "b",
      piece: "n",
      from: "d7",
      to: "b8",
      san: "Nxb8",
      flags: "c",
      lan: "d7b8",
      before: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
      after: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
      captured: "q",
    },
    {
      color: "w",
      piece: "r",
      from: "d1",
      to: "d8",
      san: "Rd8#",
      flags: "n",
      lan: "d1d8",
      before: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
      after: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
    },
  ],
};

export const EVALUATED_GAME: EvaluatedGame = {
  id: "123456",
  white: "morphy",
  black: "duke",
  moves: [
    {
      color: "w",
      piece: "p",
      from: "e2",
      to: "e4",
      san: "e4",
      flags: "b",
      lan: "e2e4",
      before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      after: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    },
    {
      color: "b",
      piece: "p",
      from: "e7",
      to: "e5",
      san: "e5",
      flags: "b",
      lan: "e7e5",
      before: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    },
    {
      color: "w",
      piece: "n",
      from: "g1",
      to: "f3",
      san: "Nf3",
      flags: "n",
      lan: "g1f3",
      before: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      after: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    },
    {
      color: "b",
      piece: "p",
      from: "d7",
      to: "d6",
      san: "d6",
      flags: "n",
      lan: "d7d6",
      before: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      after: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    },
    {
      color: "w",
      piece: "p",
      from: "d2",
      to: "d4",
      san: "d4",
      flags: "b",
      lan: "d2d4",
      before: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
      after: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    },
    {
      color: "b",
      piece: "b",
      from: "c8",
      to: "g4",
      san: "Bg4",
      flags: "n",
      lan: "c8g4",
      before: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
      after:
        "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
    },
    {
      color: "w",
      piece: "p",
      from: "d4",
      to: "e5",
      san: "dxe5",
      flags: "c",
      lan: "d4e5",
      before:
        "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
      captured: "p",
    },
    {
      color: "b",
      piece: "b",
      from: "g4",
      to: "f3",
      san: "Bxf3",
      flags: "c",
      lan: "g4f3",
      before:
        "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
      captured: "n",
    },
    {
      color: "w",
      piece: "q",
      from: "d1",
      to: "f3",
      san: "Qxf3",
      flags: "c",
      lan: "d1f3",
      before: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
      after: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
      captured: "b",
    },
    {
      color: "b",
      piece: "p",
      from: "d6",
      to: "e5",
      san: "dxe5",
      flags: "c",
      lan: "d6e5",
      before: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
      after: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
      captured: "p",
    },
    {
      color: "w",
      piece: "b",
      from: "f1",
      to: "c4",
      san: "Bc4",
      flags: "n",
      lan: "f1c4",
      before: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
      after: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
    },
    {
      color: "b",
      piece: "n",
      from: "g8",
      to: "f6",
      san: "Nf6",
      flags: "n",
      lan: "g8f6",
      before: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
      after: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
    },
    {
      color: "w",
      piece: "q",
      from: "f3",
      to: "b3",
      san: "Qb3",
      flags: "n",
      lan: "f3b3",
      before: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
      after: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
    },
    {
      color: "b",
      piece: "q",
      from: "d8",
      to: "e7",
      san: "Qe7",
      flags: "n",
      lan: "d8e7",
      before: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
      after: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
    },
    {
      color: "w",
      piece: "n",
      from: "b1",
      to: "c3",
      san: "Nc3",
      flags: "n",
      lan: "b1c3",
      before: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
      after: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
    },
    {
      color: "b",
      piece: "p",
      from: "c7",
      to: "c6",
      san: "c6",
      flags: "n",
      lan: "c7c6",
      before:
        "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
      after:
        "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
    },
    {
      color: "w",
      piece: "b",
      from: "c1",
      to: "g5",
      san: "Bg5",
      flags: "n",
      lan: "c1g5",
      before:
        "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
      after:
        "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
    },
    {
      color: "b",
      piece: "p",
      from: "b7",
      to: "b5",
      san: "b5",
      flags: "b",
      lan: "b7b5",
      before:
        "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
      after:
        "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
    },
    {
      color: "w",
      piece: "n",
      from: "c3",
      to: "b5",
      san: "Nxb5",
      flags: "c",
      lan: "c3b5",
      before:
        "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
      after:
        "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
      captured: "p",
    },
    {
      color: "b",
      piece: "p",
      from: "c6",
      to: "b5",
      san: "cxb5",
      flags: "c",
      lan: "c6b5",
      before:
        "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
      after: "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
      captured: "n",
    },
    {
      color: "w",
      piece: "b",
      from: "c4",
      to: "b5",
      san: "Bxb5+",
      flags: "c",
      lan: "c4b5",
      before:
        "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
      after: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
      captured: "p",
    },
    {
      color: "b",
      piece: "n",
      from: "b8",
      to: "d7",
      san: "Nbd7",
      flags: "n",
      lan: "b8d7",
      before: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
      after: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
    },
    {
      color: "w",
      piece: "k",
      from: "e1",
      to: "c1",
      san: "O-O-O",
      flags: "q",
      lan: "e1c1",
      before: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
      after: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
    },
    {
      color: "b",
      piece: "r",
      from: "a8",
      to: "d8",
      san: "Rd8",
      flags: "n",
      lan: "a8d8",
      before: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
      after: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
    },
    {
      color: "w",
      piece: "r",
      from: "d1",
      to: "d7",
      san: "Rxd7",
      flags: "c",
      lan: "d1d7",
      before: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
      after: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
      captured: "n",
    },
    {
      color: "b",
      piece: "r",
      from: "d8",
      to: "d7",
      san: "Rxd7",
      flags: "c",
      lan: "d8d7",
      before: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
      after: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
      captured: "r",
    },
    {
      color: "w",
      piece: "r",
      from: "h1",
      to: "d1",
      san: "Rd1",
      flags: "n",
      lan: "h1d1",
      before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
      after: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
    },
    {
      color: "b",
      piece: "q",
      from: "e7",
      to: "e6",
      san: "Qe6",
      flags: "n",
      lan: "e7e6",
      before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
      after: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
    },
    {
      color: "w",
      piece: "b",
      from: "b5",
      to: "d7",
      san: "Bxd7+",
      flags: "c",
      lan: "b5d7",
      before: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
      after: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
      captured: "r",
    },
    {
      color: "b",
      piece: "n",
      from: "f6",
      to: "d7",
      san: "Nxd7",
      flags: "c",
      lan: "f6d7",
      before: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
      after: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
      captured: "b",
    },
    {
      color: "w",
      piece: "q",
      from: "b3",
      to: "b8",
      san: "Qb8+",
      flags: "n",
      lan: "b3b8",
      before: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
      after: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
    },
    {
      color: "b",
      piece: "n",
      from: "d7",
      to: "b8",
      san: "Nxb8",
      flags: "c",
      lan: "d7b8",
      before: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
      after: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
      captured: "q",
    },
    {
      color: "w",
      piece: "r",
      from: "d1",
      to: "d8",
      san: "Rd8#",
      flags: "n",
      lan: "d1d8",
      before: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
      after: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
    },
  ],
  evaluatedPositions: [
    {
      position: {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        color: "w",
      },
      evaluation: {
        score: 53,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "p",
            from: "e2",
            to: "e4",
            san: "e4",
            flags: "b",
            lan: "e2e4",
            before: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            after: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          },
          evaluation: {
            score: 53,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        color: "b",
      },
      evaluation: {
        score: 7,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "p",
            from: "e7",
            to: "e6",
            san: "e6",
            flags: "n",
            lan: "e7e6",
            before:
              "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
            after:
              "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
          },
          evaluation: {
            score: 7,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        color: "w",
      },
      evaluation: {
        score: 95,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "n",
            from: "g1",
            to: "f3",
            san: "Nf3",
            flags: "n",
            lan: "g1f3",
            before:
              "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
            after:
              "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
          },
          evaluation: {
            score: 95,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        color: "b",
      },
      evaluation: {
        score: 9,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "p",
            from: "d7",
            to: "d6",
            san: "d6",
            flags: "n",
            lan: "d7d6",
            before:
              "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
            after:
              "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
          },
          evaluation: {
            score: 9,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
        color: "w",
      },
      evaluation: {
        score: 59,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "p",
            from: "d2",
            to: "d4",
            san: "d4",
            flags: "b",
            lan: "d2d4",
            before:
              "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
            after:
              "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
          },
          evaluation: {
            score: 59,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
        color: "b",
      },
      evaluation: {
        score: 29,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "p",
            from: "e5",
            to: "d4",
            san: "exd4",
            flags: "c",
            lan: "e5d4",
            before:
              "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
            after:
              "rnbqkbnr/ppp2ppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
            captured: "p",
          },
          evaluation: {
            score: 29,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
        color: "w",
      },
      evaluation: {
        score: 121,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "p",
            from: "d4",
            to: "e5",
            san: "dxe5",
            flags: "c",
            lan: "d4e5",
            before:
              "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
            after:
              "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
            captured: "p",
          },
          evaluation: {
            score: 121,
            depth: 18,
          },
        },
        {
          move: {
            color: "w",
            piece: "p",
            from: "c2",
            to: "c3",
            san: "c3",
            flags: "n",
            lan: "c2c3",
            before:
              "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
            after:
              "rn1qkbnr/ppp2ppp/3p4/4p3/3PP1b1/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 4",
          },
          evaluation: {
            score: 114,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
        color: "b",
      },
      evaluation: {
        score: 78,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "n",
            from: "b8",
            to: "d7",
            san: "Nd7",
            flags: "n",
            lan: "b8d7",
            before:
              "rn1qkbnr/ppp2ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
            after:
              "r2qkbnr/pppn1ppp/3p4/4P3/4P1b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 5",
          },
          evaluation: {
            score: 78,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
        color: "w",
      },
      evaluation: {
        score: 166,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "q",
            from: "d1",
            to: "f3",
            san: "Qxf3",
            flags: "c",
            lan: "d1f3",
            before:
              "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5b2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
            after:
              "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
            captured: "b",
          },
          evaluation: {
            score: 166,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
        color: "b",
      },
      evaluation: {
        score: 113,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "p",
            from: "d6",
            to: "e5",
            san: "dxe5",
            flags: "c",
            lan: "d6e5",
            before:
              "rn1qkbnr/ppp2ppp/3p4/4P3/4P3/5Q2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
            after:
              "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
            captured: "p",
          },
          evaluation: {
            score: 113,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
        color: "w",
      },
      evaluation: {
        score: 157,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "b",
            from: "f1",
            to: "c4",
            san: "Bc4",
            flags: "n",
            lan: "f1c4",
            before:
              "rn1qkbnr/ppp2ppp/8/4p3/4P3/5Q2/PPP2PPP/RNB1KB1R w KQkq - 0 6",
            after:
              "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
          },
          evaluation: {
            score: 157,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
        color: "b",
      },
      evaluation: {
        score: 73,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "d8",
            to: "f6",
            san: "Qf6",
            flags: "n",
            lan: "d8f6",
            before:
              "rn1qkbnr/ppp2ppp/8/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R b KQkq - 1 6",
            after:
              "rn2kbnr/ppp2ppp/5q2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
          },
          evaluation: {
            score: 73,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
        color: "w",
      },
      evaluation: {
        score: 195,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "q",
            from: "f3",
            to: "b3",
            san: "Qb3",
            flags: "n",
            lan: "f3b3",
            before:
              "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/5Q2/PPP2PPP/RNB1K2R w KQkq - 2 7",
            after:
              "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
          },
          evaluation: {
            score: 195,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
        color: "b",
      },
      evaluation: {
        score: 163,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "d8",
            to: "e7",
            san: "Qe7",
            flags: "n",
            lan: "d8e7",
            before:
              "rn1qkb1r/ppp2ppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R b KQkq - 3 7",
            after:
              "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
          },
          evaluation: {
            score: 163,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
        color: "w",
      },
      evaluation: {
        score: 193,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "q",
            from: "b3",
            to: "b7",
            san: "Qxb7",
            flags: "c",
            lan: "b3b7",
            before:
              "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1Q6/PPP2PPP/RNB1K2R w KQkq - 4 8",
            after:
              "rn2kb1r/pQp1qppp/5n2/4p3/2B1P3/8/PPP2PPP/RNB1K2R b KQkq - 0 8",
            captured: "p",
          },
          evaluation: {
            score: 193,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
        color: "b",
      },
      evaluation: {
        score: 137,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "p",
            from: "c7",
            to: "c6",
            san: "c6",
            flags: "n",
            lan: "c7c6",
            before:
              "rn2kb1r/ppp1qppp/5n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R b KQkq - 5 8",
            after:
              "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
          },
          evaluation: {
            score: 137,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
        color: "w",
      },
      evaluation: {
        score: 198,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "b",
            from: "c1",
            to: "g5",
            san: "Bg5",
            flags: "n",
            lan: "c1g5",
            before:
              "rn2kb1r/pp2qppp/2p2n2/4p3/2B1P3/1QN5/PPP2PPP/R1B1K2R w KQkq - 0 9",
            after:
              "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
          },
          evaluation: {
            score: 198,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
        color: "b",
      },
      evaluation: {
        score: 158,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "n",
            from: "b8",
            to: "a6",
            san: "Na6",
            flags: "n",
            lan: "b8a6",
            before:
              "rn2kb1r/pp2qppp/2p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R b KQkq - 1 9",
            after:
              "r3kb1r/pp2qppp/n1p2n2/4p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 2 10",
          },
          evaluation: {
            score: 158,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
        color: "w",
      },
      evaluation: {
        score: 289,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "n",
            from: "c3",
            to: "b5",
            san: "Nxb5",
            flags: "c",
            lan: "c3b5",
            before:
              "rn2kb1r/p3qppp/2p2n2/1p2p1B1/2B1P3/1QN5/PPP2PPP/R3K2R w KQkq - 0 10",
            after:
              "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
            captured: "p",
          },
          evaluation: {
            score: 289,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
        color: "b",
      },
      evaluation: {
        score: 260,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "e7",
            to: "b4",
            san: "Qb4+",
            flags: "n",
            lan: "e7b4",
            before:
              "rn2kb1r/p3qppp/2p2n2/1N2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 10",
            after:
              "rn2kb1r/p4ppp/2p2n2/1N2p1B1/1qB1P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 11",
          },
          evaluation: {
            score: 260,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
        color: "w",
      },
      evaluation: {
        score: 747,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "b",
            from: "c4",
            to: "b5",
            san: "Bxb5+",
            flags: "c",
            lan: "c4b5",
            before:
              "rn2kb1r/p3qppp/5n2/1p2p1B1/2B1P3/1Q6/PPP2PPP/R3K2R w KQkq - 0 11",
            after:
              "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
            captured: "p",
          },
          evaluation: {
            score: 747,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
        color: "b",
      },
      evaluation: {
        score: 732,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "n",
            from: "b8",
            to: "d7",
            san: "Nbd7",
            flags: "n",
            lan: "b8d7",
            before:
              "rn2kb1r/p3qppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R b KQkq - 0 11",
            after:
              "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
          },
          evaluation: {
            score: 732,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
        color: "w",
      },
      evaluation: {
        score: 778,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "k",
            from: "e1",
            to: "c1",
            san: "O-O-O",
            flags: "q",
            lan: "e1c1",
            before:
              "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/R3K2R w KQkq - 1 12",
            after:
              "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
          },
          evaluation: {
            score: 778,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
        color: "b",
      },
      evaluation: {
        score: 734,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "e7",
            to: "c5",
            san: "Qc5",
            flags: "n",
            lan: "e7c5",
            before:
              "r3kb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R b kq - 2 12",
            after:
              "r3kb1r/p2n1ppp/5n2/1Bq1p1B1/4P3/1Q6/PPP2PPP/2KR3R w kq - 3 13",
          },
          evaluation: {
            score: 734,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
        color: "w",
      },
      evaluation: {
        score: 914,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "r",
            from: "d1",
            to: "d7",
            san: "Rxd7",
            flags: "c",
            lan: "d1d7",
            before:
              "3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13",
            after: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
            captured: "n",
          },
          evaluation: {
            score: 914,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
        color: "b",
      },
      evaluation: {
        score: 906,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "n",
            from: "f6",
            to: "d7",
            san: "Nxd7",
            flags: "c",
            lan: "f6d7",
            before:
              "3rkb1r/p2Rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R b k - 0 13",
            after: "3rkb1r/p2nqppp/8/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
            captured: "r",
          },
          evaluation: {
            score: 906,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
        color: "w",
      },
      evaluation: {
        score: 974,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "r",
            from: "h1",
            to: "d1",
            san: "Rd1",
            flags: "n",
            lan: "h1d1",
            before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2K4R w k - 0 14",
            after: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
          },
          evaluation: {
            score: 974,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
        color: "b",
      },
      evaluation: {
        score: 937,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "e7",
            to: "b4",
            san: "Qb4",
            flags: "n",
            lan: "e7b4",
            before: "4kb1r/p2rqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 1 14",
            after:
              "4kb1r/p2r1ppp/5n2/1B2p1B1/1q2P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
          },
          evaluation: {
            score: 937,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
        color: "w",
      },
      evaluation: {
        score: 1436,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "b",
            from: "b5",
            to: "d7",
            san: "Bxd7+",
            flags: "c",
            lan: "b5d7",
            before:
              "4kb1r/p2r1ppp/4qn2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 2 15",
            after: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
            captured: "r",
          },
          evaluation: {
            score: 1436,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
        color: "b",
      },
      evaluation: {
        score: 1429,
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "q",
            from: "e6",
            to: "d7",
            san: "Qxd7",
            flags: "c",
            lan: "e6d7",
            before: "4kb1r/p2B1ppp/4qn2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 b k - 0 15",
            after: "4kb1r/p2q1ppp/5n2/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
            captured: "b",
          },
          evaluation: {
            score: 1429,
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
        color: "w",
      },
      evaluation: {
        forced_mate: {
          in: 2,
          for: "w",
        },
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "q",
            from: "b3",
            to: "b8",
            san: "Qb8+",
            flags: "n",
            lan: "b3b8",
            before: "4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16",
            after: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
          },
          evaluation: {
            forced_mate: {
              in: 2,
              for: "w",
            },
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
        color: "b",
      },
      evaluation: {
        forced_mate: {
          in: 1,
          for: "w",
        },
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "b",
            piece: "n",
            from: "d7",
            to: "b8",
            san: "Nxb8",
            flags: "c",
            lan: "d7b8",
            before: "1Q2kb1r/p2n1ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 b k - 1 16",
            after: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
            captured: "q",
          },
          evaluation: {
            forced_mate: {
              in: 1,
              for: "w",
            },
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
        color: "w",
      },
      evaluation: {
        forced_mate: {
          in: 1,
          for: "w",
        },
        depth: 18,
      },
      best_moves: [
        {
          move: {
            color: "w",
            piece: "r",
            from: "d1",
            to: "d8",
            san: "Rd8#",
            flags: "n",
            lan: "d1d8",
            before: "1n2kb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2KR4 w k - 0 17",
            after: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
          },
          evaluation: {
            forced_mate: {
              in: 1,
              for: "w",
            },
            depth: 18,
          },
        },
      ],
    },
    {
      position: {
        fen: "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5 b k - 1 17",
        color: "b",
      },
      evaluation: {
        forced_mate: {
          in: 0,
          for: "w",
        },
        depth: 0,
      },
      best_moves: [],
    },
  ],
};
