const { Sequelize } = require('sequelize');
const path = require('path');

const ratingsDbPath = path.resolve(__dirname,'db', 'ratings.db');

const ratingsSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ratingsDbPath,
  logging: false,
});

module.exports = ratingsSequelize;
