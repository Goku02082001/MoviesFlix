import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieForm from '../components/MovieForm';
import '../styles/MovieForm.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch movie details');
        if (err.response && err.response.status === 404) {
          navigate('/404');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`/api/movies/${id}`, formData);
      navigate(`/movies/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="movie-form-container">
      <h1>Edit Movie</h1>
      {movie && <MovieForm movie={movie} onSubmit={handleSubmit} buttonText="Update Movie" />}
    </div>
  );
};

export default EditMovie;