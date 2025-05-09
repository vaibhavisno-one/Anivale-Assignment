// ApiKeyModal.js
import React from 'react';
import './ApiKeyModal.css';

const ApiKeyModal = ({ apiKey, setApiKey, onSave, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Pixabay API Key Required</h2>
        <p className="modal-text">
          To use this application, you need a Pixabay API key. You can get a free API key by registering at{' '}
          <a 
            href="https://pixabay.com/api/docs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal-link"
          >
            Pixabay API Documentation
          </a>.
        </p>

        <div className="input-group">
          <label htmlFor="apiKey" className="input-label">
            Enter your Pixabay API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="api-key-input"
            placeholder="Enter your API key"
          />
        </div>

        <div className="modal-buttons">
          <button
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!apiKey.trim()}
            className={`save-button ${apiKey.trim() ? 'save-button-enabled' : 'save-button-disabled'}`}
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;