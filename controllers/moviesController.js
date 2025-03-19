const moviesService = require('../services/moviesService');

/**
 * GET /movies
 * Lists all movies (paginated)
 */
async function listAllMovies(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  try {
    const result = await moviesService.getAllMovies(page);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /movies/details/:id
 * Returns details for a specific movie
 */
async function getMovieDetails(req, res) {
  // we assume :id is the movieId (integer).
  const movieId = parseInt(req.params.id, 10);
  if (isNaN(movieId)) {
    return res.status(400).json({ error: 'Invalid movie id' });
  }
  try {
    const movie = await moviesService.getMovieDetails(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /movies/year/:year
 * Lists all movies from a particular year (paginated, sorted)
 */
async function getMoviesByYear(req, res) {
  const year = req.params.year;
  const page = parseInt(req.query.page, 10) || 1;
  const sort = req.query.sort || 'asc';
  try {
    const result = await moviesService.getMoviesByYear(year, page, sort);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

/**
 * GET /movies/genre/:genre
 * Lists all movies by genre (paginated)
 */
async function getMoviesByGenre(req, res) {
  const genre = req.params.genre;
  const page = parseInt(req.query.page, 10) || 1;
  try {
    const result = await moviesService.getMoviesByGenre(genre, page);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listAllMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre,
};
