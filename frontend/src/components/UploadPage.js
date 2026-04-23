import React, { useState } from 'react';
import axios from 'axios';
import ResultsDisplay from './ResultsDisplay';
import './UploadPage.css';

const API_URL = 'http://localhost:5000/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or image file (PNG, JPG, JPEG)');
      setFile(null);
      return;
    }
    
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError('');
    setResults(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResults(response.data);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError('');
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Upload Contract Document</h1>
        <p className="upload-subtitle">
          Upload a PDF or image file to extract and analyze clauses
        </p>

        {!results && (
          <>
            <div
              className={`drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleChange}
                accept=".pdf,.png,.jpg,.jpeg"
                className="file-input"
              />
              
              <label htmlFor="file-upload" className="file-label">
                {file ? (
                  <div className="file-selected">
                    <svg className="file-icon success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="drop-text">
                      <span className="highlight">Click to upload</span> or drag and drop
                    </p>
                    <p className="file-types">PDF, PNG, JPG, JPEG (max 50MB)</p>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="alert error">
                <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="button-group">
              {file && (
                <>
                  <button onClick={handleUpload} disabled={uploading} className="btn btn-primary">
                    {uploading ? (
                      <>
                        <svg className="spinner" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Analyze Document
                      </>
                    )}
                  </button>
                  <button onClick={handleReset} disabled={uploading} className="btn btn-secondary">
                    Clear
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {results && <ResultsDisplay results={results} onReset={handleReset} />}
      </div>
    </div>
  );
}

export default UploadPage;
