// pages/review.tsx

import React, { useState, FormEvent } from "react";

import Head from "next/head";
import axios from "axios";
import { ChessComGameData, parseGame } from "./api/fetchGame";
import { Game } from "@/chess/Game";
import { Chessboard } from "react-chessboard";
import styles from "../styles/Review.module.css";
import { useChessboard } from "@/hooks/UseChessboard";
import { Engine } from "@/engine/Engine";
import { evaluateGame } from "@/engine/Evaluate";
import { EvaluatedGame } from "@/chess/EvaluatedGame";
import GameInputForm from "@/components/GameInputForm";
import ControlButtons from "@/components/ControlButtons";
import PositionDescription from "@/components/PositionDescription";
import { MoveDescription, getMoveDescriptions } from "@/review/ReviewedGame";
import { useRouter } from "next/router";

// Only run the engine on the client.
let engine: Engine | null = null;
if (typeof window !== "undefined") {
  engine = new Engine(new Worker("/stockfish/stockfish.asm.js"), 18, 1, false);
}

const getOrientation = (
  game: Game | null,
  userName: string
): "white" | "black" => {
  if (game == null) {
    return "white";
  }
  if (game.white == userName) {
    return "white";
  } else {
    return "black";
  }
};

const Review = () => {
  const router = useRouter();
  const isDebug = router.query.debug === "true";

  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const chessboardData = useChessboard();

  const [userName, setUserName] = useState<string>("");

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
  const [evaluatedGame, setEvaluatedGame] = useState<EvaluatedGame | null>(
    null
  );

  const setDescriptionFromIndex = (positionIndex: number) => {
    if (positionIndex == 0) {
      setCurrentMoveDescription(overallDescription);
    } else if (moveDescriptions) {
      setCurrentMoveDescription(
        moveDescriptions[positionIndex - 1].description
      );
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (engine == null) {
      throw new Error("Engine is null");
    }
    setIsLoading(true);
    setLoadingMessage("Fetching game...");
    chessboardData.clearGame();
    setEvaluatedGame(null);

    try {
      const gameResponse = await axios.post("/api/fetchGame", {
        gameId,
        debug: isDebug,
      });
      const chessComGame: ChessComGameData = gameResponse.data;
      const game: Game = parseGame(chessComGame);
      // TODO: Ensure the player is one of the players in the game
      setOrientation(getOrientation(game, userName));
      chessboardData.loadGame(game);

      setLoadingMessage("Evaluating game...");
      const evaluatedGame: EvaluatedGame = await evaluateGame(game, engine);
      setEvaluatedGame(evaluatedGame);

      setLoadingMessage("Annotating game...");
      const reviewResponse = await axios.post("/api/reviewGame", {
        evaluatedGame: evaluatedGame,
        debug: isDebug,
      });
      const { promptMessages, response, reviewedGame } = reviewResponse.data;
      setMoveDescriptions(getMoveDescriptions(reviewedGame));
      setOverallDescription(reviewedGame.overallDescription);
      setCurrentMoveDescription(reviewedGame.overallDescription);
      console.log("Evaluated game:");
      console.log(evaluatedGame);
      console.log("Prompt messages:");
      console.log(promptMessages);
      console.log("Response:");
      console.log(response);
      console.log("Reviewed game:");
      console.log(reviewedGame);
    } catch (error) {
      console.error("Error fetching the game data:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
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
        <div className="ui container grid">
          <div className="four wide centered column"></div>
          <div className="eight wide centered column">
            <div className="ui center aligned one column grid">
              <div className="row">
                <GameInputForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  loadingMessage={loadingMessage}
                  userName={userName}
                  setUserName={setUserName}
                  gameId={gameId}
                  setGameId={setGameId}
                />
              </div>

              <div className="row">
                <div className={styles.Chessboard}>
                  <Chessboard
                    position={chessboardData.getPositionFen()}
                    customDarkSquareStyle={{ backgroundColor: "#34495e" }}
                    boardWidth={chessboardData.boardSize}
                    areArrowsAllowed={true}
                    boardOrientation={orientation}
                  />
                </div>
              </div>

              <div className="row">
                <ControlButtons
                  isLoading={isLoading}
                  handleJumpToStart={handleJumpToStart}
                  handleLeftClick={handleLeftClick}
                  handleRightClick={handleRightClick}
                  handleJumpToEnd={handleJumpToEnd}
                />
              </div>

              <div className="row">
                <PositionDescription
                  evaluatedPosition={
                    evaluatedGame?.evaluatedPositions[
                      chessboardData.moveIndex
                    ] || null
                  }
                  description={currentMoveDescription}
                />
              </div>
            </div>
          </div>
          <div className="four wide centered column"></div>
        </div>
      </main>
    </>
  );
};

export default Review;
