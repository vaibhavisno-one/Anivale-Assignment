// ImageCard.js
import React from 'react';
import './ImageCard.css';

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img 
        src={image.src} 
        alt={image.alt} 
        className="card-image" 
        loading="lazy" 
      />
      <div className="card-content">
        <div className="image-metadata">
          <span className="photographer">By: {image.photographer}</span>
          <div className="stats">
            <span className="stat">
              <svg xmlns="http://www.w3.org/2000/svg" className="heart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {image.likes}
            </span>
            <span className="stat">
              <svg xmlns="http://www.w3.org/2000/svg" className="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {image.downloads}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;