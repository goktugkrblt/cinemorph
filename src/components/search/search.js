import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchSvg from '../assets/search';
import axios from 'axios';

function SearchMovies({ open }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (open) {
      // Bileşen açıldığında, input elementine odaklan
      document.getElementById('searchInput').focus();
    }
  }, [open]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`);
      setSearchResults(response.data.results);
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
      fetchMovies();
    }
  };

  return (
    <div className={open ? 'search-input-content open' : 'search-input-content'}>
      <input
        id="searchInput"
        className='search-input'
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
      <SearchSvg />
      {isLoading && <div>Loading...</div>}
      <div>
        {searchResults.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovies;
