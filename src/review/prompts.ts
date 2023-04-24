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

After the last move, you may provide an overall description of the game.

Example:

1. e4 {White opens by moving the king's pawn to e4} e5 {Black responds by contesting the center with e5}
2. Nf3 {White attacks black's pawn.  This is the start of many openings, including the Italian or the Ruy Lopz.} Nc6 {Black defends their pawn.}
3. Bb5 {White is playing the Ruy Lopez.  White threatens to take the knight and then take the pawn.  This is a highly theoretical opening played by many grand masters.} a6 {Black play's Morphy's move, kicking the bishop}
...

This was a Ruy Lopez game.  White played a very good game, and black played a very bad game.  White won easily.

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
17.Rd8# 0-1
`;

export const OPERA_RESPONSE: string = `1. e4 Paul Morphy plays e4, opening with a King's Pawn Opening.
2. e5 Duke Karl / Count Isouard responds symmetrically with e5.
3. Nf3 Morphy attacks the pawn on e5, playing the classic move in the Two Knights Defense.
4. d6 Black develops a pawn to protect the e5 pawn and attack the center.
5. dxe5 Morphy captures the pawn on e5 with the knight.
6. Bg4 Black moves the bishop to g4 to pin the knight and threaten the queen.
7. dxe5 Morphy captures back the bishop on g4 with the queen.
8. Bxf3+ Black captures the bishop on f3 with the pawn, destroying Morphy's pawn structure.
9. Qxf3 Morphy develops his queen, attacking the pawn on f7.
10. dxc6 Black plays c6, defending the pawn on d6 and attacking the knight on b5.
11. Bxb5+ Morphy sacrifices his bishop to create a discovered check and attack the king.
12. Nbd7 Black develops his knight and blocks the check.
13. Rxd7 Morphy sacrifices his rook to continue the attack.
14. Qe6+ Black's king moves to e6 to avoid the check.
15. Bxd7+ Morphy captures the knight with the bishop, creating a double attack on the king and rook.
16. Qb8+ Morphy moves his queen to b8, creating a discovered check and attacking the king.
17. Nxb8 Black captures the queen with the knight.
18. Nc6+ Black checks the king with the knight.
19. Rd8# Morphy delivers a mate with his rook.

Overall, this game is a brilliant example of Paul Morphy's attacking style.
He sacrifices material to create threats against the enemy king and keeps the pressure
on throughout the game. Morphy's use of discovered checks and double attacks is particularly impressive.
Black's defense is generally good, but in the end, Morphy's relentless attacks prove to be too much.
This game is a great example of how to play an aggressive attacking game.`;

export const generatePromptMessages = (
  pgn: string
): { role: "system" | "user" | "assistant"; content: string }[] => {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: OPERA_PGN },
    { role: "assistant", content: OPERA_RESPONSE },
    { role: "user", content: pgn },
  ];
};
