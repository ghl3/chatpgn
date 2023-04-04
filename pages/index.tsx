import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


type FileInputChangeEvent = ChangeEvent<HTMLInputElement>


const Home: React.FC = () => {

  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value)
  }

  const handleFileChange = (event: FileInputChangeEvent) => {
    setFile(event.target.files ? event.target.files[0] : null)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Handle the text area value and uploaded file here
    console.log('Text area value:', textAreaValue)
    console.log('Uploaded file:', file)
  }

  return (
    <>
      <Head>
        <title>Text and File Input</title>
        <meta name="description" content="Text and file input example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.h1}>Text and File Input Example</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="textArea" className={styles.label}>
              Paste text:
            </label>
            <textarea
              id="textArea"
              value={textAreaValue}
              onChange={handleTextAreaChange}
              className={styles.textArea}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fileUpload" className={styles.label}>
              Upload a file:
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={handleFileChange}
              className={styles.fileUpload}
            />
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </main>
    </>
  )
}

export default Home
