// components/GameInputForm.tsx

import React, { FormEvent } from "react";
import styles from "../styles/GameInputForm.module.css";
import classNames from "classnames";

interface GameInputFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  loadingMessage: string;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  gameId: string;
  setGameId: (value: string) => void;
}

const GameInputForm: React.FC<GameInputFormProps> = ({
  onSubmit,
  isLoading,
  loadingMessage,
  userName,
  setUserName,
  gameId,
  setGameId,
}) => (
  <div className={styles.formContainer}>
    <h1>Enter Chess.com UserName and Game ID</h1>
    <form onSubmit={onSubmit} className={styles.gameIdForm}>
      <div className={styles.formItem}>
        <label htmlFor="user-name" className={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isLoading}
          placeholder="Chess.com username"
          required
        />
      </div>
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
    <p
      className={classNames(styles.loadingMessage, {
        [styles.hidden]: !loadingMessage,
      })}
    >
      {loadingMessage || " "}
    </p>
  </div>
);

export default GameInputForm;