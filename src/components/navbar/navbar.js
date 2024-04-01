import React, { useState, useEffect } from 'react';
import './navbar.css';
import LogoSvg from '../assets/logo';
import CloseSvg from '../assets/close';
import MovieModal from '../movieModal';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    const getRandomMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const randomMovieTitles = data.results.slice(0, 6).map(movie => movie.title);
        setRandomMovies(randomMovieTitles);
      } catch (error) {
        console.error('Error fetching random movies:', error);
        setRandomMovies([]);
      }
    };

    getRandomMovies();

    return () => {
    };
  }, []);

  useEffect(() => {
    if (isModalOpen || isSearchOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen, isSearchOpen]);

  const handleClearButtonClick = () => {
    setSearchQuery('');
    setSearchResults([]);
    const suggestionsDiv = document.querySelector('.search-suggestions');
    if (suggestionsDiv) {
      suggestionsDiv.style.display = 'block'; 
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      const suggestionsDiv = document.querySelector('.search-suggestions');
      if (suggestionsDiv) {
        suggestionsDiv.style.display = 'block';
      }
      return;
    }
  
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    }
  
    const suggestionsDiv = document.querySelector('.search-suggestions');
    if (suggestionsDiv) {
      suggestionsDiv.style.display = 'none';
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

  const handleModalClose = () => {
    closeModal();
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleSearchSuggestionClick = (movieTitle) => {
    setSearchQuery(movieTitle);
    setSearchResults([]); 
    handleSearch({ target: { value: movieTitle } }); 
  };
  
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='navbar_left-content'>
        <div className='navbar_left-content_logo'>
          <LogoSvg />
          <h1 className='logo-text'>Cine<br/>morph</h1>
        </div>
      </div>
    
      <div className='navbar_right-content'>
        <div className='navbar_search-content'>
          <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px" onClick={toggleSearch}>
            <path style={{ fill: '#000' }} d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
          </svg>
        </div>
        <div className='navbar_right-content_user_logo'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
            <circle cx="24" cy="24" r="20" fill="#000"/>
            <path fill="#fff" d="M25,31v-3.436C25,25.901,21.669,25,20,25s-5,0.901-5,2.564V31H25z"/>
            <circle cx="20" cy="20" r="3" fill="#fff"/>
            <path fill="#fff" d="M33,27.56V31h-6v-3.44c0-0.93-0.36-1.69-0.92-2.3C26.78,25.09,27.47,25,28,25	C29.67,25,33,25.9,33,27.56z"/>
            <circle cx="28" cy="20" r="3" fill="#fff"/>
          </svg>
        </div>
      </div>
      {isSearchOpen && ( 
        <div className="search-results">
         <div className='search-content'>
            <input
              className='search-bar'
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery.length > 0 && ( 
           <div className="clear-button" onClick={() => { handleClearButtonClick(); }}>
           <CloseSvg />
         </div>
            )}
          </div>
          <div className='search-suggestions'>
            <h1 className='search-suggestions-title'>Search Suggestions</h1>
            {randomMovies.map((movie, index) => (
             <div className='search-suggestions-link' key={index} onClick={() => handleSearchSuggestionClick(movie)}>{movie}</div>
            ))}
          </div>
          <div className="movies">
            {searchResults.map(movie => (
              <div className="movie" key={movie.id} onClick={() => openModal(movie)}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <p className='search-result-movie-title'>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </nav>
  );
};

export default Navbar;
