// pages/index.tsx
import Head from "next/head";
import FileInputForm from "../components/FileInputForm";
import styles from "../styles/Home.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ParsedPGN, parse } from "pgn-parser";
import { chatGPT } from "../utils/chatgpt";

const createPrompt = (pgn: ParsedPGN): string => {
  return "foobar";
};

const parseAndAnnotatePgn = async (pgnText: string) => {
  try {
    console.log("Parsing PGN: \n" + pgnText);
    const parsedPgn: ParsedPGN = parse(pgnText)[0];
    console.log("Parsed PGN:", parsedPgn);
    const annotatedPgn = await chatGPT(createPrompt(parsedPgn));
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
    parseAndAnnotatePgn(pgnText);
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
          <div className={styles.personaSelector}>
            <label htmlFor="persona-selector">Persona:</label>
            <select
              id="persona-selector"
              value={persona}
              onChange={handlePersonaChange}
              className={styles.personaDropdown}
            >
              <option value="Standard">Standard</option>
              <option value="Gotham Chess">Gotham Chess</option>
              <option value="Daniel Naroditsky">Daniel Naroditsky</option>
              <option value="Hikaru">Hikaru</option>
              <option value="Eric Rosen">Eric Rosen</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>
            Annotate PGN
          </button>
        </form>
      </main>
    </>
  );
}
