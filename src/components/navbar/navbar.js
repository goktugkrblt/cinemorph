import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import LogoSvg from '../assets/logo';
import SearchSvg from '../assets/search';
import MovieModal from '../movieModal';
import SearchMovies from '../search/search';

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeMenu, setActiveMenu] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (window.location.pathname === '/') {
      setActiveMenu('/');
    } else {
      setActiveMenu(window.location.pathname.slice(1));
    }
  }, []);

  const handleMenuLogoClick = () => {
    navigate('/');
    setActiveMenu('new');
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate(`${menu}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='navbar_left-content'>
        <div className='navbar_left-content_logo' onClick={handleMenuLogoClick}>
          <LogoSvg />
        </div>
        <div className='navbar_left-content_menu'>
          <ul>
            <li className={activeMenu === '/' ? 'active' : ''} onClick={() => handleMenuClick('/')}>New</li>
            <li className={activeMenu === 'popular' ? 'active' : ''} onClick={() => handleMenuClick('popular')}>Popular</li>
            <li className={activeMenu === 'updated' ? 'active' : ''} onClick={() => handleMenuClick('updated')}>Top Rated</li>
            <li className={activeMenu === 'now-playing' ? 'active' : ''} onClick={() => handleMenuClick('now-playing')}>Now Playing</li>
          </ul>
        </div>
      </div>

      <div className='navbar_right-content'>
        <div className='search-input-content'>
          <input
            className='search-input'
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
          <SearchSvg />
        </div>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </nav>
  );
};

export default Navbar;
