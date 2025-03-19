const express = require('express');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/movies');

const app = express();

// Middleware
app.use(bodyParser.json());

// Movies endpoints are prefixed with /movies
app.use('/movies', moviesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  
  if(err){
    console.log('Server could not start');
  }
  else{
    console.log(`Movie API running on port ${PORT}`);
  }
});
