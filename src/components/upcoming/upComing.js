import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './upcoming.css';
import MovieModal from '../movieModal';
import FilmSvg from '../assets/film';

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function UpComingFilm() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null); 

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetcUpComingrMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
        const filteredMovies = response.data.results.filter(movie => movie.poster_path); 
        setMovies(filteredMovies);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetcUpComingrMovies();
  }, [API_KEY]);

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

  return (
    <div className="upcoming-film-content">
      <div className="upcoming-movie-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie" onClick={() => openModal(movie)}>
            <div className='image-content'>
            <img
              className="upcoming-movie-poster"
              src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
            </div>
            <div className='upcoming-movie-details'> 
              <h3 className='upcoming-movie-title'>{`${movie.title}`}</h3>
              <p className='upcoming-movie-release-date'>{formatDate(movie.release_date)}</p>
            </div>        
          </div>
        ))}
      </div>
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default UpComingFilm;
