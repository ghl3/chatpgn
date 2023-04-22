// pages/review.tsx

import React, { useState, useEffect, FormEvent } from "react";

import Head from "next/head";
import axios from "axios";
import { ChessComGameData, parseGame } from "./api/fetchGame";
import { Game } from "@/chess/Game";
import { Chessboard } from "react-chessboard";
import { Position } from "@/chess/Position";
import { Fen } from "@/chess/Fen";
import styles from "../styles/Review.module.css";

const defaultFen: Fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Review = () => {
  const [gameId, setGameId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [game, setGame] = useState<Game | null>(null);
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const [position, setPosition] = useState<Position | null>(null);

  // Definet the app level state
  const [boardSize, setBoardSize] = useState<number>(600);

  // Ensure the board is always sized correctly
  useEffect(() => {
    // Initialize the board
    const getViewportSizes = () => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      return [vw, vh];
    };

    const resizeBoard = () => {
      const [vw, vh] = getViewportSizes();
      const UiHeight = 250;
      let newBoardSize;

      if (vw > vh) {
        newBoardSize = vh - UiHeight;
      } else {
        if (vh - vw <= UiHeight) {
          newBoardSize = vh - UiHeight;
        } else {
          newBoardSize = vw - 52;
        }
      }

      setBoardSize(newBoardSize);
    };

    resizeBoard();

    window.addEventListener("resize", resizeBoard);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Loading");

    try {
      const response = await axios.get(`/api/fetchGame?gameId=${gameId}`);
      const chessComGame: ChessComGameData = response.data;
      const game: Game = parseGame(chessComGame);
      setGame(game);
      setPosition(game.positions[0]);
    } catch (error) {
      console.error("Error fetching the game data:", error);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleLeftClick = () => {
    if (game && moveIndex > 0) {
      if (moveIndex > 0) {
        setMoveIndex(moveIndex - 1);
        setPosition(game.positions[moveIndex - 1]);
      }
    }
  };

  const handleRightClick = () => {
    if (game && moveIndex < game.positions.length - 1) {
      if (game && moveIndex < game.positions.length - 1) {
        setMoveIndex(moveIndex + 1);
        setPosition(game.positions[moveIndex + 1]);
      }
    }
  };

  const handleJumpToStart = () => {
    if (game) {
      setMoveIndex(0);
      setPosition(game.positions[0]);
    }
  };

  const handleJumpToEnd = () => {
    if (game) {
      const endIndex = game.positions.length - 1;
      setMoveIndex(endIndex);
      setPosition(game.positions[endIndex]);
    }
  };

  return (
    <>
      <Head>
        <title>Review Chess Game</title>
        <meta
          name="description"
          content="Enter a chess.com game ID to review"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Enter Chess.com Game ID</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="game-id">Game ID:</label>
          <input
            type="text"
            id="game-id"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Review"}
          </button>
        </form>

        <div className={`${styles.GameReview} ui grid container`}>
          <div className={`${styles.YourCustomStyle} ten wide column`}>
            <div
              className={`${styles.YourCustomStyle} ui center aligned one column grid`}
            >
              <div className={`${styles.YourCustomStyle} row`}>
                <div className={`${styles.YourCustomStyle} Chessboard`}>
                  <Chessboard
                    position={position !== null ? position.fen : defaultFen}
                    customLightSquareStyle={{ backgroundColor: "#95a5a6" }}
                    customDarkSquareStyle={{ backgroundColor: "#34495e" }}
                    boardWidth={boardSize}
                    areArrowsAllowed={true}
                    boardOrientation={"white"}
                  />
                </div>
              </div>
              <div className="row">
                <button
                  className={styles.localButton}
                  onClick={handleJumpToStart}
                >
                  &laquo;
                </button>
                <button
                  className={styles.localButton}
                  onClick={handleLeftClick}
                >
                  &larr;
                </button>
                <button
                  className={styles.localButton}
                  onClick={handleRightClick}
                >
                  &rarr;
                </button>
                <button
                  className={styles.localButton}
                  onClick={handleJumpToEnd}
                >
                  &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Review;
