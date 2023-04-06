
// components/FileInputForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/FileInputForm.module.css';

interface FileInputFormProps {
    handleFileText: (text: string) => void;
}

const FileInputForm: React.FC<FileInputFormProps> = ({ handleFileText }) => {

    const [textAreaValue, setTextAreaValue] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (textAreaValue != null) {
            handleFileText(textAreaValue);
        } else if (selectedFile != null) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    handleFileText(reader.result.toString());
                } else {
                    console.log("ERROR");
                }
            };
            reader.readAsText(selectedFile);
        } else {
            throw new Error("Fuckabees");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="textArea" className={styles.label}>
                    Paste text:
                </label>
                <textarea
                    id="textArea"
                    value={textAreaValue || ''}
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
    );
};

export default FileInputForm;