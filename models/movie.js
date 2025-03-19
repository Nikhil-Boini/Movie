const { DataTypes } = require('sequelize');
const moviesSequelize = require('../moviesDb');

const Movie = moviesSequelize.define('Movie', {
  movieId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imdbId: {
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.TEXT,
  },
  overview: {
    type: DataTypes.TEXT,
  },
  productionCompanies: {
    type: DataTypes.TEXT,
  },
  releaseDate: {
    type: DataTypes.TEXT,
  },
  budget: {
    type: DataTypes.INTEGER,
  },
  revenue: {
    type: DataTypes.INTEGER,
  },
  runtime: {
    type: DataTypes.REAL,
  },
  language: {
    type: DataTypes.TEXT,
  },
  genres: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'movies',  
  freezeTableName: true, 
  timestamps: false,    // Assuming no createdAt/updatedAt columns
});

module.exports = Movie;
