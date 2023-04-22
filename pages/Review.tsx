// pages/review.tsx

import React, { useState, FormEvent } from "react";
import classNames from "classnames";

import Head from "next/head";
import axios from "axios";
import { ChessComGameData, parseGame } from "./api/fetchGame";
import { Game } from "@/chess/Game";
import { Chessboard } from "react-chessboard";
import styles from "../styles/Review.module.css";
import { MoveDescription } from "./api/reviewGame";
import { useChessboard } from "@/hooks/UseChessboard";

const Review = () => {
  const chessboardData = useChessboard();

  const [gameId, setGameId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [moveDescriptions, setMoveDescriptions] = useState<
    MoveDescription[] | null
  >(null);
  const [overallDescription, setOverallDescription] = useState<string | null>(
    null
  );
  const [currentMoveDescription, setCurrentMoveDescription] = useState<
    string | null
  >(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Fetching game...");
    chessboardData.clearGame();

    try {
      const gameResponse = await axios.post("/api/fetchGame", { gameId });
      const chessComGame: ChessComGameData = gameResponse.data;
      const game: Game = parseGame(chessComGame);
      chessboardData.loadGame(game);
      console.log(game);

      setLoadingMessage("Annotating game...");

      // TODO: Send a parsed and evaluated game pgn
      const reviewResponse = await axios.post("/api/reviewGame", {
        pgn: chessComGame.game.pgn,
        debug: true,
      });
      const { moveDescriptions, overallDescription } = reviewResponse.data;
      setMoveDescriptions(moveDescriptions);
      setOverallDescription(overallDescription);
      setDescriptionFromIndex(chessboardData.moveIndex);
      console.log("Annotated game:", moveDescriptions);
      console.log("Annotated game:", overallDescription);
    } catch (error) {
      console.error("Error fetching the game data:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const setDescriptionFromIndex = (positionIndex: number) => {
    console.log(
      "Setting description from index: ",
      positionIndex,
      " of ",
      moveDescriptions?.length
    );
    if (moveDescriptions) {
      if (positionIndex == 0) {
        setCurrentMoveDescription(overallDescription);
      } else {
        setCurrentMoveDescription(
          moveDescriptions[positionIndex - 1].description
        );
      }
    } else {
      setCurrentMoveDescription(null);
    }
  };

  const setGamePosition = (moveIndex: number) => {
    chessboardData.setPositionFromIndex(moveIndex);
    setDescriptionFromIndex(moveIndex);
  };

  const handleLeftClick = () => {
    if (chessboardData.moveIndex <= 0) {
      return;
    }
    setGamePosition(chessboardData.moveIndex - 1);
  };

  const handleRightClick = () => {
    if (
      chessboardData.moveIndex + 1 ==
      chessboardData.game?.positions?.length
    ) {
      return;
    }
    setGamePosition(chessboardData.moveIndex + 1);
  };

  const handleJumpToStart = () => {
    if (chessboardData.game) {
      setGamePosition(0);
    }
  };

  const handleJumpToEnd = () => {
    if (chessboardData.game) {
      const endIndex = chessboardData.game.positions.length - 1;
      setGamePosition(endIndex);
    } else {
      setGamePosition(0);
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
        <div className={styles.formContainer}>
          <h1>Enter Chess.com Game ID</h1>
          <form onSubmit={handleSubmit} className={styles.gameIdForm}>
            <label htmlFor="game-id">Game ID:</label>
            <input
              type="text"
              id="game-id"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              Review
            </button>
          </form>
          <p
            className={classNames(styles.loadingMessage, {
              [styles.hidden]: !loadingMessage,
            })}
          >
            {loadingMessage || " "}
          </p>
        </div>

        <div className="ui grid container">
          <div className={`${styles.YourCustomStyle} ten wide column`}>
            <div
              className={`${styles.YourCustomStyle} ui center aligned one column grid`}
            >
              <div className={`${styles.YourCustomStyle} row`}>
                <div className={`${styles.YourCustomStyle} Chessboard`}>
                  <Chessboard
                    position={chessboardData.getPositionFen()}
                    customDarkSquareStyle={{ backgroundColor: "#34495e" }}
                    boardWidth={chessboardData.boardSize}
                    areArrowsAllowed={true}
                    boardOrientation={"white"} //chessboardData.getBoardOrientation()}
                  />
                </div>
              </div>

              <div className="row">
                <div className="ui center aligned basic segment">
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleJumpToStart}
                    disabled={isLoading}
                  >
                    &laquo;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleLeftClick}
                    disabled={isLoading}
                  >
                    &larr;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleRightClick}
                    disabled={isLoading}
                  >
                    &rarr;
                  </button>
                  <button
                    className={`${styles.localButton} ui small button`}
                    onClick={handleJumpToEnd}
                    disabled={isLoading}
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
