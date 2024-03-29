import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="20px" height="20px"><path style={{ fill: '#000' }} d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"/></svg>
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
