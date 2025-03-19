const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const moviesDbPath = path.resolve(__dirname, 'db', 'movies.db');
const ratingsDbPath = path.resolve(__dirname, 'db', 'ratings.db');

const moviesDb = new sqlite3.Database(moviesDbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Could not connect to movies database:', err);
  } else {
    console.log('Connected to movies database');
  }
});

const ratingsDb = new sqlite3.Database(ratingsDbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Could not connect to ratings database:', err);
  } else {
    console.log('Connected to ratings database');
  }
});

module.exports = { moviesDb, ratingsDb };
