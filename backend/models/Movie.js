import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1888, 
    max: new Date().getFullYear() + 5 
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  poster: {
    type: String,
    default: 'https://via.placeholder.com/300x450?text=No+Poster'
  },
  description: {
    type: String,
    default: 'No description available.'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;