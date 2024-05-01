import React from 'react';
import MovieModal from '../movieModal';

const SearchResults = ({ searchResults, openModal, closeModal, isModalOpen, selectedMovie }) => {
  return (
    <div>
      {searchResults && searchResults.map(movie => (
        <div className="film-content" key={movie.id}>
          <div className="movie" onClick={() => openModal(movie)}>
            <div className='image-content'>
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            </div>
            <div className='movie-details'> 
              <h3 className='movie-title'>{movie.title}</h3>
     
            </div>        
          </div>
        </div>
      ))}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchResults;
