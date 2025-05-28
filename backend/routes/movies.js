import express from 'express';
import Movie from '../models/Movie.js';
import authMiddelware from '../middleware/authMiddelware.js';

const movieRoutes = express.Router();

// Get all movies
movieRoutes.get('/', async (req, res) => {
  console.log("This route is working");
 
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// post a movie

movieRoutes.post("/postAMovie",authMiddelware, async (req, res) => {

  console.log("This route is working");
  
  try {
    const { title, genre, year, rating, poster, description } = req.body;
    
    const newMovie = new Movie({
      title,
      genre,
      year,
      rating,
      poster: poster || undefined,
      description: description || undefined,
      user: req.user.id
    });
    
    // const savedMovie = 
    await newMovie.save();
    res.status(201).json(
      "saved"
    );
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get movie by ID
movieRoutes.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

  
// Update a movie (protected)
movieRoutes.put('/:id', authMiddelware, async (req, res) => {
  try {
    const { title, genre, year, rating, poster, description } = req.body;
    
    // Find movie
    let movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check user
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Update movie
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, genre, year, rating, poster, description },
      { new: true }
    );
    
    res.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a movie (protected)
movieRoutes.delete('/:id', authMiddelware, async (req, res) => {
  try {
    // Find movie
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Check user
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Delete movie
    await Movie.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Movie removed' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default movieRoutes;