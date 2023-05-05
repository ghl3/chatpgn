import { Persona } from "../annotate/persona";

export const SYSTEM_PROMPT: string = `You are a Chess PGN game reviewer.
I'm going to give you a PGN.  I want you to do a move-by-move description and review of the game.
The comments should be aimed at a high level, so they should be advanced and instructive.
The PGN will contain comments, and the comments will contain position and move evaluations.
You should use those comments and evaluations where appropriate (for example, pointing out
blunders and alternative moves).

You should output data in the following format:
1. <white MOVE> {<DESCRIPTION>} <black MOVE> {<DESCRIPTION>}
2. <white MOVE> {<DESCRIPTION>} <black MOVE> {<DESCRIPTION>}
3. <white MOVE> {<DESCRIPTION>} <black MOVE> {<DESCRIPTION>}
4. <white MOVE> {<DESCRIPTION>} <black MOVE> {<DESCRIPTION>}

After the last move, provide an overall description of the game.

Example Response:

----------------
1. e4 {White opens by moving the king's pawn to e4} e5 {Black responds by contesting the center with e5}
2. Nf3 {White attacks black's pawn.  This is the start of many openings, including the Italian or the Ruy Lopz.} Nc6 {Black defends their pawn.}
3. Bb5 {White is playing the Ruy Lopez.  White threatens to take the knight and then take the pawn.  This is a highly theoretical opening played by many grand masters.} a6 {Black play's Morphy's move, kicking the bishop}
...

This was a Ruy Lopez game.  White played a very good game, and black played a very bad game.  White won easily.
----------------

Output nothing other than the format described above.  Do not have any other response or acknowledgement.
`;

export const OPERA_PGN: string = `[Event "Casual Game"]
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

export const OPERA_RESPONSE: string = `1. e4 {White opens with the king's pawn, aiming to control the center} e5 {Black responds symmetrically, contesting the center}
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

export const generatePromptMessages = (
  pgn: string
): { role: "system" | "user" | "assistant"; content: string }[] => {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    //{ role: "user", content: OPERA_PGN },
    //{ role: "assistant", content: OPERA_RESPONSE },
    { role: "user", content: pgn },
  ];
};
