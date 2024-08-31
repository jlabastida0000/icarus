import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = async () => {
    setUploadStatus('Uploading...');
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Uploader</h1>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${
          isDragActive ? 'bg-blue-100' : ''
        }`}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Selected files:</h2>
        <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file.name} className="mb-1">
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      </div>
      {files.length > 0 && (
        <button 
          onClick={uploadFiles}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Files
        </button>
      )}
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
}

export default App;