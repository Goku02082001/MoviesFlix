import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} alt={`${movie.title} poster`} />
        <div className="movie-rating">{movie.rating.toFixed(1)}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-genre">{movie.genre}</span>
        </div>
        <Link to={`/movies/${movie._id}`} className="movie-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;