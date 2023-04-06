
// components/FileInputForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/FileInputForm.module.css';

interface FileInputFormProps {
    handleFileText: (text: string) => void;
}

const FileInputForm: React.FC<FileInputFormProps> = ({ handleFileText }) => {
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
        setSelectedFile(null);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setTextAreaValue(''); // Clear text area contents when a file is selected
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (textAreaValue) {
            handleFileText(textAreaValue);
        } else if (selectedFile) {
            try {
                const fileContents = await readFileAsText(selectedFile);
                setTextAreaValue(fileContents);
                handleFileText(fileContents);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        } else {
            console.error('No text or file selected.');
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