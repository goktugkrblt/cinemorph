import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './allfilm.css';
import MovieModal from '../movieModal';
import FilmSvg from '../assets/film';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function AllFilms() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filmCount, setFilmCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
        const filteredMovies = response.data.results.filter(movie => movie.poster_path); 
        if (page > 1) {
          setMovies(prevMovies => [...prevMovies, ...filteredMovies]);
        } else {
          setMovies(filteredMovies);
        }
        setCurrentPage(page);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      }
    };
  
    fetchMovies();
  }, [API_KEY, page]);
  

  useEffect(() => {
    const fetchVideoKey = async () => {
      if (!selectedMovie) return;

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${API_KEY}`);
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
  }, [selectedMovie, API_KEY]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    document.getElementById('overlay').classList.add('active'); 
  };
  
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
    setVideoKey(null); 
    document.getElementById('overlay').classList.remove('active'); 
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

  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setPage(prevPage => prevPage + 1);
          setIsLoading(false);
        }, 700); 
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);
  
  
  
  

  useEffect(() => {
    const content = document.querySelector('.all-films-content');
    const showContent = () => {
      if (content) {
        const contentTop = content.getBoundingClientRect().top;
        const screenBottom = window.innerHeight;
        if (contentTop < screenBottom) {
          content.classList.add('show');
        }
      }
    };
    window.addEventListener('scroll', showContent);
    return () => window.removeEventListener('scroll', showContent);
  }, []);

  useEffect(() => {
    console.log("Movies:", movies);
  }, [movies]);

  return (
    <div className="all-films-content">
      <h2 className='all-films-title'><FilmSvg />All Films</h2>
      <div className="all-movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie" onClick={() => openModal(movie)}>
            <div className='image-content'>
              <img
                className="all-movie-poster"
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
              <div className="overlay-movie"></div>
            </div>        
            <div className='all-movie-details'> 
              <h3 className='all-movie-title'>{`${movie.title}`}</h3>
              <p className='all-movie-release-date'>{formatDate(movie.release_date)}</p>
            </div>  
          </div>
        ))}
      </div>
      
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      {isLoading && <div className="spinner-container"><div className="spinner"></div></div>}
    </div>
  );
}

export default AllFilms;
