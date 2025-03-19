const {moviesDb,ratingsDb} = require('../db');
const ITEMS_PER_PAGE = 50;

// Helper function to format budget in dollars
function formatBudget(budget) {
  if (budget === null || budget === undefined) return null;
  // Assuming budget is stored in integer dollars; format with a dollar sign and commas
  return `$${Number(budget).toLocaleString()}`;
}

// List all movies (paginated)
const getAllMovies = (page = 1) => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const query = `
    SELECT imdbid,movieId, title, genres, releaseDate, budget
    FROM movies
    LIMIT ? OFFSET ?;
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [ITEMS_PER_PAGE, offset], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const formattedRows = rows.map(row => ({
        ...row,
        budget: formatBudget(row.budget)
      }));
      resolve(formattedRows);
    });
  });
};

// Get movie details including average rating from the ratings table
const getMovieDetails = (id) => {
  const movieQuery = `
    SELECT imdbid, movieid, title, overview, releaseDate, budget, runtime, genres, language, productionCompanies
    FROM movies
    WHERE movieid = ?;
  `;
  return new Promise((resolve, reject) => {
    moviesDb.get(movieQuery, [id], (err, movie) => {
      if (err) {
        return reject(err);
      }
      if (!movie) {
        return resolve(null);
      }
      movie.budget = formatBudget(movie.budget);
      
      // Retrieve average rating from the ratings table
      const ratingQuery = `
        SELECT AVG(rating) as average_rating
        FROM ratings
        WHERE movieid = ?;
      `;
      ratingsDb.get(ratingQuery, [movie.movieId], (err, ratingResult) => {
        if (err) {
          return reject(err);
        }
        movie.average_rating = ratingResult ? ratingResult.average_rating : null;
        resolve(movie);
      });
    });
  });
};

// Get movies for a given year, sorted by release_date (asc or desc)
const getMoviesByYear = (year, page = 1, sort = 'asc') => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  // Filter movies by release year assuming release_date is stored as YYYY-MM-DD
  const query = `
    SELECT imdbid, title, genres, releaseDate, budget
    FROM movies
    WHERE strftime('%Y', releaseDate) = ?
    ORDER BY releaseDate ${sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}
    LIMIT ? OFFSET ?;
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [year, ITEMS_PER_PAGE, offset], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const formattedRows = rows.map(row => ({
        ...row,
        budget: formatBudget(row.budget)
      }));
      resolve(formattedRows);
    });
  });
};

// Get movies by genre 
const getMoviesByGenre = (genre, page = 1) => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const query = `
    SELECT imdbid, title, genres, releaseDate, budget
    FROM movies
    WHERE genres LIKE ?
    LIMIT ? OFFSET ?;
  `;
  return new Promise((resolve, reject) => {
    moviesDb.all(query, [`%${genre}%`, ITEMS_PER_PAGE, offset], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const formattedRows = rows.map(row => ({
        ...row,
        budget: formatBudget(row.budget)
      }));
      resolve(formattedRows);
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieDetails,
  getMoviesByYear,
  getMoviesByGenre
};
