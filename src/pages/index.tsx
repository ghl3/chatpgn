// pages/index.tsx
import Head from "next/head";
import FileInputForm from "../components/FileInputForm";
import PersonaSelector from "../components/PersonaSelector";
import AnnotatedPgnDisplay from "../components/AnnotatedPgnDisplay";
import styles from "../styles/Home.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ParseTree, parseGame } from "@mliebelt/pgn-parser";
import { annotatePgn } from "../utils/annotatePgn";
import { Persona } from "../utils/persona";
import Image from "next/image";
import Header from "../components/Header"; // Import Header component

export default function Home() {
  const [pgnText, setPgnText] = useState("");
  const [persona, setPersona] = useState<Persona>(Persona.Standard);
  const [annotatedPgn, setAnnotatedPgn] = useState<ParseTree | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnnotatedPgn(null);

    try {
      const pgn: ParseTree = parseGame(pgnText);

      const response = await Promise.race([
        annotatePgn(pgn, persona),
        new Promise<ParseTree>(
          (_, reject) => setTimeout(() => reject(new Error("Timeout")), 30000) // 30 seconds timeout
        ),
      ]);
      setAnnotatedPgn(response);
    } catch (error) {
      console.error("Error annotating PGN:", error);
      setError("An error occurred while annotating PGN or it timed out.");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPersona(event.target.value as Persona);
  };

  return (
    <>
      <Header /> {/* Include Header component */}
      <Head>
        <title>ChatPGN</title>
        <meta name="description" content="Text and file input" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.siteHeader}>
        <h1 className={styles.siteTitle}>ChatPGN</h1>
      </header>
      <main className={styles.main}>
        <h1 className={styles.h1}>Add your PGN below</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FileInputForm textArea={pgnText} setTextArea={setPgnText} />
          <PersonaSelector
            persona={persona}
            onPersonaChange={handlePersonaChange}
          />
          {!loading && (
            <button type="submit" className={styles.button}>
              Annotate PGN
            </button>
          )}
        </form>
        {loading && (
          <div className={styles.loading}>
            <Image
              src="/images/loading.gif"
              alt="Loading..."
              width="64"
              height="64"
            />
          </div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        <AnnotatedPgnDisplay pgn={annotatedPgn} />
      </main>
    </>
  );
}
