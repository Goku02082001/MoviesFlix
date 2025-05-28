import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieForm from '../components/MovieForm';
import '../styles/MovieForm.css';

const AddMovie = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post('https://movies-flix-hf3g.vercel.app/api/movies/postAMovie', formData);
      navigate('/movies');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="movie-form-container">
      <h1>Add New Movie</h1>
      {error && <div className="error-message">{error}</div>}
      <MovieForm onSubmit={handleSubmit} buttonText="Add Movie" />
    </div>
  );
};

export default AddMovie;