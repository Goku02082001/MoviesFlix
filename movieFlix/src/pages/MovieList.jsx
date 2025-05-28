import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import '../styles/MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({
    genre: '',
    year: '',
    search: ''
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://movies-flix-iota.vercel.app/api/movies/');
        setMovies(res.data);
        setError('');
      } catch (err) {
        setError('Error fetching movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = !filter.genre || movie.genre.toLowerCase().includes(filter.genre.toLowerCase());
    const matchesYear = !filter.year || movie.year.toString() === filter.year;
    const matchesSearch = !filter.search || 
      movie.title.toLowerCase().includes(filter.search.toLowerCase()) || 
      movie.genre.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesGenre && matchesYear && matchesSearch;
  });

  
  const genres = [...new Set(movies.map(movie => movie.genre))].sort();
  // Get unique years for filter dropdown
  const years = [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a);

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        <h1>Movie Collection</h1>
        <Link to="/movies/add" className="add-movie-btn">Add New Movie</Link>
      </div>

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Search movies..."
            value={filter.search}
            onChange={handleFilterChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-dropdowns">
          <select
            name="genre"
            value={filter.genre}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          
          <select
            name="year"
            value={filter.year}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="no-movies">
          <p>No movies found. {movies.length > 0 ? 'Try adjusting your filters.' : 'Add some movies to your collection!'}</p>
          {movies.length === 0 && (
            <Link to="/movies/add" className="add-movie-btn">Add Your First Movie</Link>
          )}
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;