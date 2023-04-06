
// components/FileInputForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/FileInputForm.module.css';

interface FileInputFormProps {
    textArea: string;
    setTextArea: (text: string) => void;
}

const FileInputForm: React.FC<FileInputFormProps> = ({ textArea, setTextArea }) => {
    //const [textAreaValue, setTextAreaValue] = useState<string>('');

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextArea(event.target.value);
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            try {
                const fileContents = await readFileAsText(file);
                setTextArea(fileContents);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    const readFileAsText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject(new Error('Invalid file format.'));
                }
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(file);
        });
    };

    return (
        <>
            <div className={styles.formGroup}>
                <label htmlFor="textArea" className={styles.label}>
                    Paste text or upload a file:
                </label>
                <textarea
                    id="textArea"
                    value={textArea}
                    onChange={handleTextAreaChange}
                    className={styles.textArea}
                ></textarea>
            </div>

            <div className={styles.formGroup}>
                <input
                    id="fileUpload"
                    type="file"
                    onChange={handleFileChange}
                    className={styles.fileUpload}
                />
            </div>
        </>
    );
};

export default FileInputForm;