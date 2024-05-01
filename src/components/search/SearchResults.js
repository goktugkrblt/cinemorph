import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieModal from '../movieModal';
import CloseSvg from '../assets/close';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const FilmList = ({ movies, openModal }) => {
  return (
    <div className="film-content">
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie" onClick={() => openModal(movie)}>
            <div className='image-content'>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
            </div>
            <div className='movie-details'> 
              <h3 className='movie-title'>{`${movie.title}`}</h3>
              <p className='movie-release-date'>{formatDate(movie.release_date)}</p>
            </div>        
          </div>
        ))}
      </div>
    </div>
  );
}

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results);
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div>
      <FilmList movies={searchResults} openModal={openModal} />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchResults;
