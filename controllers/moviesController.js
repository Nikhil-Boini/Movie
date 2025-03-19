const moviesService = require('../services/moviesService');

const listAllMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesService.getAllMovies(page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMovieDetails = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await moviesService.getMovieDetails(movieId);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.json(movie);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByYear = async (req, res) => {
  const year = req.params.year;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || 'asc';
  try {
    const movies = await moviesService.getMoviesByYear(year, page, sort);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMoviesByGenre = async (req, res) => {
  const genre = req.params.genre;
  const page = parseInt(req.query.page) || 1;
  try {
    const movies = await moviesService.getMoviesByGenre(genre, page);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  listAllMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre
};
