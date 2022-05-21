const axios = require('axios');

const movieDbAPI = axios.create({
  timeout: 30000,
  baseURL: 'https://api.themoviedb.org/3',
  headers: { 'Content-Type': 'application/json' },
});

module.exports = movieDbAPI;