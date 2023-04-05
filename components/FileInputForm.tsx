
// components/FileInputForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/FileInputForm.module.css';

interface FileInputFormProps {
    onSubmit: (text: string, file: File | null) => void;
}

const FileInputForm: React.FC<FileInputFormProps> = ({ onSubmit }) => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(textAreaValue, selectedFile);
    };

    return (
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
    );
};

export default FileInputForm;