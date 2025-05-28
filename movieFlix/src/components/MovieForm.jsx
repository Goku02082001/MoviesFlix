import React, { useState } from 'react';
import '../styles/MovieForm.css';

const MovieForm = ({ movie = {}, onSubmit, buttonText = 'Save Movie' }) => {
  const [formData, setFormData] = useState({
    title: movie.title || '',
    genre: movie.genre || '',
    year: movie.year || new Date().getFullYear(),
    rating: movie.rating || 5,
    poster: movie.poster || '',
    description: movie.description || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1888 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = `Year must be between 1888 and ${new Date().getFullYear() + 5}`;
    }
    
    if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className={errors.genre ? 'error' : ''}
        />
        {errors.genre && <div className="error-message">{errors.genre}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            min="1888"
            max={new Date().getFullYear() + 5}
            value={formData.year}
            onChange={handleChange}
            className={errors.year ? 'error' : ''}
          />
          {errors.year && <div className="error-message">{errors.year}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (0-10)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className={errors.rating ? 'error' : ''}
          />
          {errors.rating && <div className="error-message">{errors.rating}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="poster">Poster URL (optional)</label>
        <input
          type="text"
          id="poster"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">{buttonText}</button>
    </form>
  );
};

export default MovieForm;