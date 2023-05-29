import React, { useState, useCallback } from "react";

import Head from "next/head";
import axios from "axios";
import { ChessComGameData, parseGame } from "./api/fetchGame";
import { Game } from "@/chess/Game";
import styles from "../styles/Review.module.css";
import { Engine } from "@/engine/Engine";
import { evaluateGame } from "@/engine/Evaluate";
import { EvaluatedGame } from "@/chess/EvaluatedGame";
import GameInputForm from "@/components/GameInputForm";
import PositionDescription from "@/components/PositionDescription";
import { MoveDescription } from "@/review/ReviewedGame";
import { useRouter } from "next/router";
import {
  ChessboardState,
  useChessboardState,
} from "@/hooks/UseChessboardState";
import Chessboard from "@/components/Chessboard";
import { parseReview } from "@/review/ReviewParser";
import LoadingIndicator from "@/components/LoadingIndicator";

// Only run the engine on the client.
let engine: Engine | null = null;
if (typeof window !== "undefined") {
  engine = new Engine(new Worker("/stockfish/stockfish.asm.js"), 18, 1, false);
}

const Review = () => {
  const router = useRouter();
  const isDebug = router.query.debug === "true";

  const chessboardState: ChessboardState = useChessboardState();

  const [gameId, setGameId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [moveDescriptions, setMoveDescriptions] = useState<MoveDescription[]>(
    []
  );
  const [overallDescription, setOverallDescription] = useState<string | null>(
    null
  );
  const [evaluatedGame, setEvaluatedGame] = useState<EvaluatedGame | null>(
    null
  );

  const [processedMoveIndex, setProcessedMoveIndex] = useState<number>(0);

  const totalMoves = evaluatedGame?.moves.length || 0;
  //const currentMove = chessboardState.moveIndex || 0;

  const getCurrentMoveDescription = (): string | null => {
    if (
      chessboardState == null ||
      chessboardState.game == null ||
      chessboardState.moveIndex == null
    ) {
      return null;
    }

    const moveIndex = chessboardState.moveIndex;
    if (moveIndex == 0) {
      return overallDescription;
    } else if (moveDescriptions.length < moveIndex) {
      return null;
    } else {
      return moveDescriptions[moveIndex - 1].description;
    }
  };

  const currentMoveDescription = getCurrentMoveDescription();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (engine == null) {
        throw new Error("Engine is null");
      }
      setIsLoading(true);
      setLoadingMessage("Fetching game...");
      chessboardState.clearGame();
      setEvaluatedGame(null);
      setMoveDescriptions([]);
      setOverallDescription(null);
      setProcessedMoveIndex(0);

      try {
        const gameResponse = await axios.post("/api/fetchGame", {
          gameId,
          debug: isDebug,
        });
        const chessComGame: ChessComGameData = gameResponse.data;
        const game: Game = parseGame(chessComGame);
        chessboardState.loadGame(game);

        setLoadingMessage("Evaluating game...");
        // TODO: Turn this into a stream.  Set the evaluations incrementally
        // and then update setProcessedMoveIndex.
        const evaluatedGame: EvaluatedGame = await evaluateGame(
          game,
          engine,
          isDebug
        );
        setEvaluatedGame(evaluatedGame);

        setLoadingMessage("Annotating game...");
        const reviewResponse = await fetch("/api/reviewGame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            evaluatedGame: evaluatedGame,
            debug: isDebug,
          }),
        });

        if (reviewResponse.body == null) {
          throw new Error("Review response is null");
        }

        for await (const item of parseReview(reviewResponse.body)) {
          if (item.kind === "comment") {
            setOverallDescription(item.description);
          } else if (item.kind === "move") {
            setMoveDescriptions((moveDescriptions) => [
              ...moveDescriptions,
              item as MoveDescription,
            ]);
            setProcessedMoveIndex(
              (processedMoveIndex) => processedMoveIndex + 1
            );
          }
        }
      } catch (error) {
        console.error("Error fetching the game data:", error);
      } finally {
        setIsLoading(false);
        setLoadingMessage("");
      }
    },
    [
      gameId,
      isDebug,
      chessboardState,
      setEvaluatedGame,
      setMoveDescriptions,
      setOverallDescription,
    ]
  );

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
                  gameId={gameId}
                  setGameId={setGameId}
                />
                {isLoading && (
                  <LoadingIndicator
                    loadingMessage={loadingMessage}
                    progress={processedMoveIndex}
                    maxProgress={totalMoves}
                  />
                )}
              </div>

              <Chessboard chessboardState={chessboardState} />

              <div className="row">
                <PositionDescription
                  evaluatedPosition={
                    evaluatedGame?.evaluatedPositions[
                      chessboardState.moveIndex
                    ] || null
                  }
                  description={currentMoveDescription}
                  isLoading={isLoading}
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
