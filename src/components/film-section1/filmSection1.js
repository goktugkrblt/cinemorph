import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filmsection1.css';

function FilmSection1() {
  const [movie, setMovie] = useState({});
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const desiredMovieTitle = "Harry Potter and the Deathly Hallows: Part 2"; 
  const [roundedVoteAverage, setRoundedVoteAverage] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${desiredMovieTitle}`);
        const foundMovie = response.data.results.find(movie => movie.title === desiredMovieTitle);
        if (foundMovie) {
          setMovie(foundMovie);
          if (foundMovie.vote_average) { 
            const roundedAverage = Math.round(foundMovie.vote_average);
            setRoundedVoteAverage(roundedAverage);
          }
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
    <div className="film-section-container">
      {movie && (
        <div key={movie.id} className="film-section-movie">
          <img
            className="film-section-container-movie-poster"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
          <div className='film-section-container-content'> 
            <h1 className='film-section-movie-id'>{`${movie.title}`}</h1>
            <p><strong>Overview:</strong> {movie.overview}</p>
            {roundedVoteAverage && <p><strong>Vote Average:</strong> {roundedVoteAverage}</p>}
            {movie.vote_count && <p><strong>Vote Count:</strong> {movie.vote_count.toLocaleString()}</p>}
          </div>    
              
        </div>
      )}
    </div>
  );
}

export default FilmSection1;
