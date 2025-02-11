import { useState } from "react";
import axios from 'axios';

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTranscription(response.data);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error transcribing audio", error);
            setError("Failed to transcribe audio. Please check the backend server.");
        }
    };

    return (
        <div className="container">
            <h1>Audio to Text Transcriber</h1>
            <div className="file-input">
                <input type="file" accept="audio/*" onChange={handleFileChange} />
            </div>
            <button className="upload-button" onClick={handleUpload}>
                Upload and Transcribe
            </button>
            <div className="transcription-result">
                <h2>Transcription Result</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p>{transcription}</p>
            </div>
        </div>
    );
};

export default AudioUploader;