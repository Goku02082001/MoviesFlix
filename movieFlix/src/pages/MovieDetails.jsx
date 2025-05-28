import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://movies-flix-iota.vercel.app/movies/${id}`);
        setMovie(res.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Movie not found');
          navigate('/404');
        } else {
          setError('Error fetching movie details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://movies-flix-iota.vercel.app/api/movies/${id}`);
      navigate('/movies');
    } catch (err) {
      setError('Error deleting movie');
    }
  };

  const isOwner = isAuthenticated && movie && user && movie.user === user.id;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/movies" className="back-btn">Back to Movies</Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img 
            src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'} 
            alt={`${movie.title} poster`} 
          />
        </div>

        <div className="movie-details-info">
          <div className="movie-details-header">
            <h1>{movie.title}</h1>
            <div className="movie-details-meta">
              <span className="movie-year">{movie.year}</span>
              <span className="movie-genre">{movie.genre}</span>
              <span className="movie-rating">★ {movie.rating.toFixed(1)}/10</span>
            </div>
          </div>

          <div className="movie-description">
            <h3>Description</h3>
            <p>{movie.description || 'No description available.'}</p>
          </div>

          <div className="movie-details-actions">
            <Link to="/movies" className="back-btn">Back to Movies</Link>
            
            {isOwner && (
              <>
                <Link to={`/movies/edit/${movie._id}`} className="edit-btn">
                  Edit Movie
                </Link>
                <button 
                  className="delete-btn"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Movie
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete "{movie.title}"?</p>
            <p className="warning">This action cannot be undone.</p>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;