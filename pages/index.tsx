// pages/index.tsx
import Head from 'next/head';
import FileInputForm from '../components/FileInputForm';
import styles from '../styles/Home.module.css';


export default function Home() {

  const handleFormSubmit = (text: string, file: File | null) => {
    console.log('Text:', text);
    console.log('File:', file);
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
        <h1 className={styles.h1}>Upload your PGN below</h1>
        <FileInputForm onSubmit={handleFormSubmit} />
      </main>
    </>
  );
}
