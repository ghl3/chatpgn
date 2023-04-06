// pages/index.tsx
import Head from 'next/head';
import FileInputForm from '../components/FileInputForm';
import styles from '../styles/Home.module.css';
import React, { ChangeEvent, FormEvent, useState } from 'react';


export default function Home() {

  const [pgnText, setPgnText] = useState('');

  const handleFormText = (text: string) => {
    console.log('Text:', text);
    setPgnText(text);
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
        <FileInputForm handleFileText={handleFormText} />
        <button type="submit" className={styles.button}>
          Annotate PGN
        </button>
      </main>
    </>
  );
}
