// pages/index.tsx
import Head from "next/head";
import FileInputForm from "../components/FileInputForm";
import PersonaSelector from "../components/PersonaSelector";
import styles from "../styles/Home.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ParsedPGN, parse } from "pgn-parser";
import { annotatePgn } from "../utils/annotatePgn";

const parseAndAnnotatePgn = async (pgnText: string, persona: string) => {
  try {
    console.log("Parsing PGN: \n" + pgnText);
    const pgn: ParsedPGN = parse(pgnText)[0];
    console.log("Parsed PGN:", pgn);
    const annotatedPgn = await annotatePgn(pgn, persona);
    console.log("Annotated PGN:", annotatedPgn);
  } catch (error) {
    console.error("Error parsing PGN:", error);
  }
};

export default function Home() {
  const [pgnText, setPgnText] = useState("");
  const [persona, setPersona] = useState("Standard");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    parseAndAnnotatePgn(pgnText, persona);
  };

  const handlePersonaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPersona(event.target.value);
  };

  return (
    <>
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
          <button type="submit" className={styles.button}>
            Annotate PGN
          </button>
        </form>
      </main>
    </>
  );
}
