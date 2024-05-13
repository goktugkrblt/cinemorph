import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieModal from '../movieModal'; // Import your MovieModal component

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store selected movie
  const location = useLocation();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data.results);
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [location.search, API_KEY]);

  // Function to handle opening modal and setting selected movie
  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
  };

  
  function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  // Function to handle closing modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className="film-content">
        <div className="movie-list">
          {searchResults.map(movie => (
            <div key={movie.id} className="movie" onClick={() => handleOpenModal(movie)}>
              <div className='image-content'>
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </div>
              <div className='movie-details'> 
                <h3 className='movie-title'>{`${movie.title}`}</h3>
                <p className='movie-release-date'>{formatDate(movie.release_date)}</p>
              </div>   
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />} {/* Render modal if selectedMovie is not null */}
    </div>
  );
};

export default SearchResults;
