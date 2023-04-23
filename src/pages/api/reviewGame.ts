// pages/api/annotatedPgn.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import {
  exampleQuery,
  exampleResponse,
  systemPrompt,
} from "@/utils/gameReviewPrompts";
import { EvaluatedGame } from "@/chess/EvaluatedGame";
import { EvaluatedPosition } from "@/chess/EvaluatedPosition";
import { Move } from "@/chess/Move";
import { EvaluationUtil } from "@/chess/Evaluation";

const operaGameText: string = `1. e4 {White opens with the king's pawn, claiming the center} e5 {Black responds symmetrically, establishing a classical pawn structure}
2. Nf3 {White develops the knight, attacking the e5 pawn} d6 {Black defends the e5 pawn with a pawn, entering the Philidor's Defense}
3. d4 {White challenges Black's pawn structure with a pawn break} Bg4 {Black pins the knight, discouraging White from capturing on e5}
4. dxe5 {White captures the e5 pawn, disregarding the pin} Bxf3 {Black captures the knight, damaging White's pawn structure}
5. Qxf3 {White recaptures with the queen, maintaining control of the center} dxe5 {Black recaptures the pawn, restoring material balance}
6. Bc4 {White develops the bishop, attacking the vulnerable f7 square} Nf6 {Black develops the knight, defending f7 and controlling the center}
7. Qb3 {White's queen attacks the b7 pawn and maintains pressure on f7} Qe7 {Black defends the b7 pawn and connects the rooks}
8. Nc3 {White develops the knight, preparing to castle queenside} c6 {Black solidifies the pawn structure and restricts the scope of White's pieces}
9. Bg5 {White pins the f6 knight, putting pressure on Black's position} b5 {Black attacks the bishop, aiming to disrupt White's coordination}
10. Nxb5 {White captures the b5 pawn with the knight, exploiting Black's pawn weakness} cxb5 {Black recaptures the pawn, opening the c-file}
11. Bxb5+ {White checks with the bishop, forcing a response} Nbd7 {Black blocks the check with the knight, defending the king}
12. O-O-O {White castles queenside, connecting the rooks and targeting the d7 knight} Rd8 {Black challenges White's rook and defends the knight}
13. Rxd7 {White sacrifices the rook to expose Black's king} Rxd7 {Black recaptures the rook, accepting the sacrifice}
14. Rd1 {White places the rook on the open file, attacking the pinned knight} Qe6 {Black defends the knight with the queen, reinforcing the pin}
15. Bxd7+ {White captures the knight, forcing Black's queen to recapture} Nxd7 {Black recaptures with the other knight, maintaining material balance}
16. Qb8+ {White checks with the queen, forcing a response} Nxb8 {Black blocks the check with the knight, offering a queen trade}
17. Rd8# {White delivers checkmate with the rook, ending the game} 0-1

This game, known as the Opera Game, showcases Paul Morphy's brilliant attacking play and tactical vision. Despite facing two opponents consulting together, Morphy outplayed them with a series of sacrifices and precise moves, ultimately delivering a stunning checkmate. The game serves as a shining example of the importance of rapid development, coordination, and control of open lines.
`;

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export interface MoveDescription {
  color: "white" | "black";
  move: string;
  description: string;
}

export interface TurnDescription {
  white: MoveDescription;
  black?: MoveDescription;
}

export interface ReviewedGame {
  turnDescriptions: TurnDescription[];
  overallDescription: string;
}

const parseMoveDescription = (
  moveWithDescription: string,
  color: "white" | "black"
): MoveDescription => {
  const regex = /(\S+)\s+\{([^}]+)\}/;
  const match = moveWithDescription.match(regex);

  if (match) {
    const [, move, description] = match;
    return {
      color,
      move,
      description: description.trim(),
    };
  }

  return { color: "white", move: "", description: "" };
};

const parseGameText = (gameText: string): ReviewedGame => {
  const lines = gameText.split("\n");
  const turnDescriptions: TurnDescription[] = [];
  const overallDescriptionText: string[] = [];

  for (const line of lines) {
    const regex = /^\d+\.\s+((\S+)\s+\{[^}]+\})(\s+((\S+)\s+\{[^}]+\}))?/;
    const match = line.match(regex);

    if (match) {
      const [, whiteMove, , blackMove] = match;
      const whiteMoveDescription = parseMoveDescription(whiteMove, "white");
      const blackMoveDescription = blackMove
        ? parseMoveDescription(blackMove, "black")
        : undefined;
      turnDescriptions.push({
        white: whiteMoveDescription,
        black: blackMoveDescription,
      });
    } else {
      overallDescriptionText.push(line);
    }
  }

  const overallDescription = overallDescriptionText.join("\n");
  return {
    turnDescriptions,
    overallDescription,
  };
};

export const getMoveDescriptions = (
  parsedGame: ReviewedGame
): MoveDescription[] => {
  const { turnDescriptions } = parsedGame;
  const moveDescriptions: MoveDescription[] = [];
  for (const turnDescription of turnDescriptions) {
    moveDescriptions.push(turnDescription.white);
    if (turnDescription.black) {
      moveDescriptions.push(turnDescription.black);
    }
  }
  return moveDescriptions;
};

const makeMoveComment = (
  move: Move,
  startingPositionEvaluation: EvaluatedPosition,
  endingPositionEvaluation: EvaluatedPosition
): string => {
  const startingEvalString = EvaluationUtil.toEvalString(
    startingPositionEvaluation.evaluation
  );
  const endingEvalString = EvaluationUtil.toEvalString(
    endingPositionEvaluation.evaluation
  );

  const bestMoveDescriptions = [];
  for (const move of startingPositionEvaluation.best_moves) {
    const moveDesiption = `${move.move.san} (${EvaluationUtil.toEvalString(
      move.evaluation
    )})`;
    bestMoveDescriptions.push(moveDesiption);
  }

  const bestMoveDescription = bestMoveDescriptions.join(", ");

  return `eval before: ${startingEvalString},
  best moves: ${bestMoveDescription},
  eval after: ${endingEvalString}`;
};

const createEvaluatedPgn = (evaluatedGame: EvaluatedGame): string => {
  const pgnLines: string[] = [];
  //let gameMove: number = 1;
  for (const [index, move] of evaluatedGame.moves.entries()) {
    const color = index % 2 === 0 ? "w" : "b";
    const gameMoveNumber = Math.floor(index / 2) + 1;
    const startingPositionEvaluation = evaluatedGame.evaluatedPositions[index];
    const endingPositionEvaluation =
      evaluatedGame.evaluatedPositions[index + 1];
    const prefix = color == "w" ? `${gameMoveNumber}.` : "";
    const suffix = color == "b" ? "\n" : "";
    const comment = makeMoveComment(
      move,
      startingPositionEvaluation,
      endingPositionEvaluation
    )
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ");
    pgnLines.push(`${prefix} ${move.san} {${comment}}${suffix}`);
  }
  return pgnLines.join(" ");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", method: req.method });
    return;
  }

  const { evaluatedGame, debug } = req.body;

  const pgn: string = createEvaluatedPgn(evaluatedGame);

  if (debug) {
    const response = operaGameText;
    const reviewedGame = parseGameText(response);
    res.status(200).json({ response, reviewedGame });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      n: 1,
      max_tokens: 2048,
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user", content: exampleQuery() },
        { role: "assistant", content: exampleResponse() },
        { role: "user", content: pgn },
      ],
    });

    if (completion.data.choices[0].message?.content === undefined) {
      console.error("Completion response is missing content");
      res.status(500).json({
        error: "Completion response is missing content",
        details: completion.data.choices[0],
      });
      return;
    }

    const response = completion.data.choices[0].message.content;

    try {
      //const annotatedPgn = convertToPgn(response);
      // TODO: handle 'continue'
      const reviewedGame = parseGameText(response);

      res.status(200).json({
        response,
        reviewedGame,
      });
    } catch (pgnError) {
      console.error("PGN conversion error:", pgnError);
      res.status(500).json({
        error: "PGN conversion error",
        details: { response, pgnError },
      });
    }
  } catch (error) {
    console.error("An unknown error occurred:", error);
    res.status(500).json({
      error: "An unknown error occurred",
      details: { errorMessage: (error as Error).message },
    });
  }
}
