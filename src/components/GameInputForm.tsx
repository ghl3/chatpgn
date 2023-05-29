// components/GameInputForm.tsx

import React, { FormEvent } from "react";
import styles from "../styles/GameInputForm.module.css";

interface GameInputFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  gameId: string;
  setGameId: (value: string) => void;
}

const GameInputForm: React.FC<GameInputFormProps> = ({
  onSubmit,
  isLoading,
  gameId,
  setGameId,
}) => (
  <div className={styles.formContainer}>
    <h1>Enter Chess.com UserName and Game ID</h1>
    <form onSubmit={onSubmit} className={styles.gameIdForm}>
      <div className={styles.formItem}>
        <label htmlFor="game-id" className={styles.label}>
          Game ID:
        </label>
        <input
          type="text"
          id="game-id"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          disabled={isLoading}
          placeholder="Chess.com Game ID"
          required
        />
      </div>
      <button
        type="submit"
        className={styles.reviewButton}
        disabled={isLoading}
      >
        Review
      </button>
    </form>
  </div>
);

export default GameInputForm;
