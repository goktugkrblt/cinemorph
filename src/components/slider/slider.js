import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './slider.css';

function Slider() {
  const [movie, setMovie] = useState({});
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const desiredMovieTitle = "Dune: Part Two"; 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${desiredMovieTitle}`);
        const foundMovie = response.data.results.find(movie => movie.title === desiredMovieTitle);
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          console.error('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [API_KEY, desiredMovieTitle]);

  return (
    <div className="slider-container">
      {movie && (
        <div key={movie.id} className="movie-slider">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
          <div className='slider-film-content'> 
            <h1 className='movie-id'>{`${movie.title}`}</h1>
            <button className='view-details'>View Details</button>
          </div>        
        </div>
      )}
    </div>
  );
}

export default Slider;
