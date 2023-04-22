// pages/api/chess-game.ts
import type { NextApiRequest, NextApiResponse } from "next";
import ChessWebAPI from "chess-web-api";
import { Game } from "@/chess/Game";
import { MoveIndex } from "@/chess/MoveIndex";
import { GameState, Position } from "@/chess/Position";
import { Chess } from "chess.js";

export interface ChessComGameData {
  game: ChessComGame;
  players: ChessComPlayers;
}

export interface ChessComGame {
  colorOfWinner: string;
  id: number;
  uuid: string;
  initialSetup: string;

  isCheckmate: boolean;
  isStalemate: boolean;
  isFinished: boolean;
  isRated: boolean;
  isResignable: boolean;
  lastMove: string;
  moveList: string;

  ratingChangeWhite: number;
  ratingChangeBlack: number;
  resultMessage: string;
  endTime: number;
  turnColor: string;
  type: string;
  typeName: string;

  pgnHeaders: ChessComPGNHeaders;
  moveTimestamps: string;
  baseTime1: number;
  timeIncrement1: number;
  pgn: string;
}

export interface ChessComPGNHeaders {
  Event: string;
  Site: string;
  Date: string;
  White: string;
  Black: string;
  Result: string;
  ECO: string;
  WhiteElo: number;
  BlackElo: number;
  TimeControl: string;
  EndTime: string;
  Termination: string;
  SetUp: string;
  FEN: string;
}

export interface ChessComPlayers {
  top: ChessComPlayer;
  bottom: ChessComPlayer;
}

export interface ChessComPlayer {
  id: number;
  canWinOnTime: boolean;
  color: string;
  turnTimeRemaining: string;
  username: string;
}

const getGameState = (game: Chess): GameState => {
  if (game.isStalemate()) {
    return "STALEMATE";
  } else if (game.isCheckmate()) {
    return "CHECKMATE";
  } else if (game.isDraw()) {
    return "DRAW";
  } else {
    return "OTHER";
  }
};

// Parse a fetched Chess.com PGN, including metadata
export const parseGame = (game: ChessComGameData): Game => {
  const parsed_game = new Chess();
  parsed_game.loadPgn(game.game.pgn);

  const positions: Position[] = [];

  // Create a new game and walk through the moves of the
  // previously parsed game to generate the per-move fen
  const incremental_game = new Chess();

  // Note that this is extremely expensive for when we have
  // to download many games.

  var moveIndex: MoveIndex = { turn: "w", moveNumber: 1 };
  for (let move of parsed_game.history()) {
    positions.push({
      moveIndex: { ...moveIndex },
      fen: incremental_game.fen(),
      gameState: getGameState(incremental_game),
    });

    // Update the position
    incremental_game.move(move);

    if (moveIndex.turn === "w") {
      moveIndex.turn = "b";
    } else {
      moveIndex.turn = "w";
      moveIndex.moveNumber += 1;
    }
  }
  // Capture the final position
  positions.push({
    moveIndex: { ...moveIndex },
    fen: incremental_game.fen(),
    gameState: getGameState(incremental_game),
  });

  const white =
    game.players.top.color === "white" ? game.players.top : game.players.bottom;
  const black =
    game.players.top.color === "black" ? game.players.top : game.players.bottom;

  return {
    id: game.game.id.toString(),
    white: white.username,
    black: black.username,
    date: parsed_game.header().Date.replaceAll(".", "-"),
    positions: positions,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "Game ID is required" });
  }

  try {
    const chessAPI = new ChessWebAPI();
    const response = await chessAPI.getGameByID(gameId);
    const chessComGame: ChessComGameData = response.body;
    res.status(200).json(chessComGame);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the game data" });
  }
}
