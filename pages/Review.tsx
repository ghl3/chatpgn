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
import { MoveDescription } from "./api/reviewGame";

const defaultFen: Fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Review = () => {
  const [gameId, setGameId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [game, setGame] = useState<Game | null>(null);
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const [position, setPosition] = useState<Position | null>(null);
  const [moveDescriptions, setMoveDescriptions] = useState<
    MoveDescription[] | null
  >(null);
  const [overallDescription, setOverallDescription] = useState<string | null>(
    null
  );
  const [currentMoveDescription, setCurrentMoveDescription] = useState<
    string | null
  >(null);

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
    setLoadingMessage("Fetching game...");

    try {
      const gameResponse = await axios.post("/api/fetchGame", { gameId });
      const chessComGame: ChessComGameData = gameResponse.data;
      const game: Game = parseGame(chessComGame);
      setGame(game);
      setPosition(game.positions[0]);
      console.log(game);

      setLoadingMessage("Annotating game...");

      // TODO: Send a parsed and evaluated game pgn
      const reviewResponse = await axios.post("/api/reviewGame", {
        pgn: chessComGame.game.pgn,
      });
      const { moveDescriptions, overallDescription } = reviewResponse.data;
      setMoveDescriptions(moveDescriptions);
      setOverallDescription(overallDescription);
      setCurrentMoveDescirption(moveIndex);
    } catch (error) {
      console.error("Error fetching the game data:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const setCurrentMoveDescirption = (moveIndex: number) => {
    if (moveDescriptions) {
      if (moveIndex == 0) {
        setCurrentMoveDescription(overallDescription);
      } else {
        setCurrentMoveDescription(moveDescriptions[moveIndex - 1].description);
      }
    } else {
      setCurrentMoveDescription(null);
    }
  };

  const setGamePosition = (moveIndex: number) => {
    if (game) {
      setMoveIndex(moveIndex);
      setPosition(game.positions[moveIndex]);
      setCurrentMoveDescirption(moveIndex);
    }
  };

  const handleLeftClick = () => {
    if (game && moveIndex > 0) {
      if (moveIndex > 0) {
        setGamePosition(moveIndex - 1);
      }
    }
  };

  const handleRightClick = () => {
    if (game && moveIndex < game.positions.length - 1) {
      if (game && moveIndex < game.positions.length - 1) {
        setGamePosition(moveIndex + 1);
      }
    }
  };

  const handleJumpToStart = () => {
    if (game) {
      setGamePosition(0);
    }
  };

  const handleJumpToEnd = () => {
    if (game) {
      const endIndex = game.positions.length - 1;
      setGamePosition(endIndex);
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
      <main className={styles.GameReview}>
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
            {isLoading ? loadingMessage : "Review"}
          </button>
        </form>

        <div className="ui grid container">
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
                <div className="ui center aligned basic segment">
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleJumpToStart}
                  >
                    &laquo;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleLeftClick}
                  >
                    &larr;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleRightClick}
                  >
                    &rarr;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleJumpToEnd}
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            </div>

            <div className={`${styles.YourCustomStyle} ten wide column`}>
              <div
                className={`${styles.YourCustomStyle} ui center aligned one column grid`}
              >
                {currentMoveDescription && (
                  <p className={styles.overallDescription}>
                    {currentMoveDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Review;
