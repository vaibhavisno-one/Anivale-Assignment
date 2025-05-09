// App.js
import React, { useState, useEffect } from 'react';
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ImageCard from "./components/ImageCard/ImageCard.jsx";
import ApiKeyModal from "./components/ApiKeyModal/ApiKeyModal.jsx";
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Check for saved API key in localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('pixabayApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = () => {
    localStorage.setItem('pixabayApiKey', apiKey);
    setShowApiKeyModal(false);
  };

  // Use the Pixabay API to search for real images
  const searchImages = (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    
    if (!searchQuery.trim()) {
      setImages([]);
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setError('Please enter your Pixabay API key to search for images.');
      setShowApiKeyModal(true);
      setLoading(false);
      return;
    }

    const API_URL = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&per_page=12`;
    
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.hits && data.hits.length > 0) {
          const results = data.hits.map(image => ({
            id: image.id,
            src: image.webformatURL,
            alt: `${searchQuery} - ${image.tags}`,
            width: image.webformatWidth,
            height: image.webformatHeight,
            photographer: image.user,
            likes: image.likes,
            downloads: image.downloads
          }));
          setImages(results);
        } else {
          setImages([]);
          setError('No images found for your search query.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError('Failed to search for images. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Pixabay Image Search</h1>
        <p className="app-subtitle">Search for high-quality images powered by Pixabay API</p>
        <button 
          onClick={() => setShowApiKeyModal(true)}
          className="api-key-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Configure API Key
        </button>
      </header>

      <SearchBox onSearch={searchImages} loading={loading} />

      {error && (
        <div className="error-message">{error}</div>
      )}

      {images.length > 0 ? (
        <div className="image-grid">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          {query && !loading 
            ? "No images found. Try another search term." 
            : "Search for something to display images"}
        </div>
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal 
          apiKey={apiKey}
          setApiKey={setApiKey}
          onSave={saveApiKey}
          onCancel={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}

export default App;