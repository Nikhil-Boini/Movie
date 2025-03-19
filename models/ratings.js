const { DataTypes } = require('sequelize');
const ratingsSequelize = require('../ratingsDb');

const Rating = ratingsSequelize.define('Rating', {
  ratingId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  movieId: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.REAL,
  },
  timestamp: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'ratings', 
  timestamps: false,
});

module.exports = Rating;
