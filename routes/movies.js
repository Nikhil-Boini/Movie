const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies with pagination
router.get('/', moviesController.listAllMovies);

// Movies by year (sorted, paginated)
// Example: GET /movies/year/2018?page=2&sort=desc
router.get('/year/:year', moviesController.getMoviesByYear);

// Movies by genre (paginated)
// Example: GET /movies/genre/Comedy?page=1
router.get('/genre/:genre', moviesController.getMoviesByGenre);

// Movie details endpoint
// Example: GET /movies/details/25
router.get('/details/:id', moviesController.getMovieDetails);

module.exports = router;
