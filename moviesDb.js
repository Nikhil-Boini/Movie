const { Sequelize } = require('sequelize');
const path = require('path');

const moviesDbPath = path.resolve(__dirname,'db', 'movies.db');
console.log("path1", moviesDbPath);

const moviesSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: moviesDbPath,
  logging: false, 
});

module.exports = moviesSequelize;
