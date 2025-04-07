import React, { useState } from 'react';
import axios from 'axios';


const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 10 Mo');
      return;
    }
    setFile(selectedFile);
    setMessage('');
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      // Using a test endpoint - adjust this to match your backend test route
      const response = await axios.post(
        'http://localhost:8000/upload-test', // Change this to your test endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMessage(response.data.message || 'Document téléchargé avec succès');
      setFile(null);
      document.getElementById('document-upload').value = '';
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Erreur lors du téléchargement du document'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="document-upload-container">
      <h3>Test d'Upload</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="document-upload">Choisir un fichier :</label>
          <input
            type="file"
            id="document-upload"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            disabled={isLoading}
          />
          <small className="form-hint">
            Formats : PDF, DOC, DOCX, PPT, PPTX (max 10 Mo)
          </small>
        </div>

        <button 
          type="submit" 
          disabled={!file || isLoading}
          className="upload-button"
        >
          {isLoading ? 'En cours...' : 'Uploader'}
        </button>
      </form>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;