// pages/api/chess-game.ts
import type { NextApiRequest, NextApiResponse } from "next";
import ChessWebAPI from "chess-web-api";
import { Game } from "@/chess/Game";
import { GameState, Position } from "@/chess/Position";
import { Chess } from "chess.js";
import { Move } from "@/chess/Move";
import { Color } from "@/chess/Color";

const operaGamePgn: string = `[Event "Casual Game"]
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

export interface ChessComGameData {
  game: ChessComGame;
  players: ChessComPlayers;
}

export interface ChessComGame {
  id: number;
  pgn: string;
  pgnHeaders?: ChessComPGNHeaders;
}

export interface ChessComPGNHeaders {
  Event?: string;
  Site?: string;
  Date?: string;
  White?: string;
  Black?: string;
  Result?: string;
  ECO?: string;
  WhiteElo?: number;
  BlackElo?: number;
  TimeControl?: string;
  EndTime?: string;
  Termination?: string;
  SetUp?: string;
  FEN?: string;
}

export interface ChessComPlayers {
  top: ChessComPlayer;
  bottom: ChessComPlayer;
}

export interface ChessComPlayer {
  color: string;
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

interface MoveIndex {
  turn: Color;
  moveNumber: number;
}

// Parse a fetched Chess.com PGN, including metadata
export const parseGame = (game: ChessComGameData): Game => {
  const parsed_game = new Chess();
  parsed_game.loadPgn(game.game.pgn);

  const positions: Position[] = [];
  const moves: Move[] = [];

  // Create a new game and walk through the moves of the
  // previously parsed game to generate the per-move fen
  const incremental_game = new Chess();

  var moveIndex: MoveIndex = { turn: "w", moveNumber: 1 };
  for (let move of parsed_game.history()) {
    positions.push({
      color: moveIndex.turn,
      fen: incremental_game.fen(),
    });

    // Update the position
    const parsedMove = incremental_game.move(move);
    moves.push(parsedMove);

    if (moveIndex.turn === "w") {
      moveIndex.turn = "b";
    } else {
      moveIndex.turn = "w";
      moveIndex.moveNumber += 1;
    }
  }

  // Capture the final position
  // There should be 1 more position than move
  positions.push({
    color: moveIndex.turn,
    fen: incremental_game.fen(),
  });

  const white =
    game.players.top.color === "white" ? game.players.top : game.players.bottom;
  const black =
    game.players.top.color === "black" ? game.players.top : game.players.bottom;

  return {
    id: game.game.id.toString(),
    white: white.username,
    black: black.username,
    positions: positions,
    moves: moves,
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

  const { gameId, debug } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "Game ID is required" });
  }

  if (debug) {
    const chessComGame: ChessComGameData = {
      game: {
        id: 123456,
        pgn: operaGamePgn,
      },
      players: {
        top: { color: "white", username: "morphy" },
        bottom: { color: "black", username: "duke" },
      },
    };

    return res.status(200).json(chessComGame);
  }

  try {
    const chessAPI = new ChessWebAPI();
    const response = await chessAPI.getGameByID(gameId);
    const chessComGame: ChessComGameData = response.body;
    return res.status(200).json(chessComGame);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching the game data" });
  }
}
