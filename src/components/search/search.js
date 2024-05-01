import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieModal from '../movieModal'; 
import { useNavigate } from 'react-router-dom';
import FilmList from './SearchResults';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const SearchMovies = ({ open }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`);
      setSearchResults(response.data.results.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase())));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchMovies();
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div className={open ? 'search-input-content open' : 'search-input-content'}>
      <input
        id="searchInput"
        className='search-input'
        type="text"
        placeholder="Search movies by title..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
      {isLoading && <div>Loading...</div>}
      <FilmList movies={searchResults} openModal={openModal} /> 
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default SearchMovies;
