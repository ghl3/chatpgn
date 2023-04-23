// components/GameIdForm.tsx

import React, { FormEvent } from "react";
import styles from "../styles/Review.module.css";
import classNames from "classnames";

interface GameIdFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  loadingMessage: string;
  gameId: string;
  setGameId: (value: string) => void;
}

const GameIdForm: React.FC<GameIdFormProps> = ({
  onSubmit,
  isLoading,
  loadingMessage,
  gameId,
  setGameId,
}) => (
  <div className={styles.formContainer}>
    <h1>Enter Chess.com Game ID</h1>
    <form onSubmit={onSubmit} className={styles.gameIdForm}>
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
);

export default GameIdForm;
