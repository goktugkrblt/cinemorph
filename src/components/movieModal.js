import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseSvg from './assets/close';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function MovieModal({ movie, onClose }) {
  const [videoKey, setVideoKey] = useState(null);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchVideoKey = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
        const videos = response.data.results;
        if (videos.length > 0) {
          const firstVideoKey = videos[0].key;
          setVideoKey(firstVideoKey);
        } else {
          setVideoKey(null);
        }
      } catch (error) {
        console.error('Error fetching video key:', error);
        setVideoKey(null);
      }
    };

    fetchVideoKey();
  }, [movie, API_KEY]);

  return (
    <div className="modal-open-content">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <CloseSvg />
        </button>
       
        <div className="modal-content">
          <div className='modal-content-top'>
              <div className="modal-left">
                <img
                  className="modal-movie-poster"
                  src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </div>
                <div className="modal-right">
                <h2>{movie.title}</h2>
                  <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
                  <p><strong>Overview:</strong> {movie.overview}</p>
                  <p><strong>Vote Average:</strong> {movie.vote_average}</p>
                  <p><strong>Vote Count:</strong> {movie.vote_count}</p>
            
                </div>
            </div>     
          {videoKey && ( 
              <div className="trailer-container">
               
                <iframe
                  title={`${movie.title} Trailer`}
                  className="trailer-video"
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  allowFullScreen
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
