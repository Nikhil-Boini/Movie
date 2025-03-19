const Movie = require('../models/movie');
const Rating = require('../models/ratings');
const { Op, fn, col } = require('sequelize');

const ITEMS_PER_PAGE = 50;

// Helper: format budget as a dollar string
function formatBudget(budget) {
  if (!budget && budget !== 0) return null;
  return `$${Number(budget).toLocaleString()}`;
}

/**
 * List all movies, paginated
 */
async function getAllMovies(page = 1) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { rows, count } = await Movie.findAndCountAll({
    attributes: ['movieId', 'imdbId', 'title', 'genres', 'releaseDate', 'budget'],
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const formattedRows = rows.map((movie) => ({
    movieId: movie.movieId,
    imdbId: movie.imdbId,
    title: movie.title,
    genres: movie.genres,
    releaseDate: movie.releaseDate,
    budget: formatBudget(movie.budget),
  }));

  return {
    data: formattedRows,
    currentPage: page,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
  };
}

/**
 * Movie details including average rating
 */
async function getMovieDetails(movieId) {
  // 1) Fetch the movie from the movies DB
  const movie = await Movie.findOne({
    where: { movieId },
  });

  if (!movie) return null;

  // 2) Format the budget
  const details = {
    movieId: movie.movieId,
    imdbId: movie.imdbId,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.releaseDate,
    budget: formatBudget(movie.budget),
    runtime: movie.runtime,
    language: movie.language,
    genres: movie.genres,
    productionCompanies: movie.productionCompanies,
    revenue: movie.revenue,
    status: movie.status,
  };

  // 3) Calculate the average rating from the ratings DB
  const avgRating = await Rating.findOne({
    attributes: [[fn('AVG', col('rating')), 'averageRating']],
    where: { movieId: movie.movieId },
  });

  // If we got a result, attach averageRating
  details.averageRating = avgRating?.dataValues?.averageRating || null;

  return details;
}

/**
 * Movies by year, paginated, with optional ascending/descending sort
 */
async function getMoviesByYear(year, page = 1, sort = 'asc') {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // If releaseDate is stored as YYYY-MM-DD, we can filter by year using LIKE
  const { rows, count } = await Movie.findAndCountAll({
    attributes: ['movieId', 'imdbId', 'title', 'genres', 'releaseDate', 'budget'],
    where: {
      releaseDate: {
        [Op.like]: `${year}-%-%`,
      },
    },
    order: [['releaseDate', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']],
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const formattedRows = rows.map((movie) => ({
    movieId: movie.movieId,
    imdbId: movie.imdbId,
    title: movie.title,
    genres: movie.genres,
    releaseDate: movie.releaseDate,
    budget: formatBudget(movie.budget),
  }));

  return {
    data: formattedRows,
    currentPage: page,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
  };
}

/**
 * Movies by genre, paginated
 */
async function getMoviesByGenre(genre, page = 1) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { rows, count } = await Movie.findAndCountAll({
    attributes: ['movieId', 'imdbId', 'title', 'genres', 'releaseDate', 'budget'],
    where: {
      genres: {
        [Op.like]: `%${genre}%`,
      },
    },
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const formattedRows = rows.map((movie) => ({
    movieId: movie.movieId,
    imdbId: movie.imdbId,
    title: movie.title,
    genres: movie.genres,
    releaseDate: movie.releaseDate,
    budget: formatBudget(movie.budget),
  }));

  return {
    data: formattedRows,
    currentPage: page,
    totalPages: Math.ceil(count / ITEMS_PER_PAGE),
  };
}

module.exports = {
  getAllMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre,
};
