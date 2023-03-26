const axios = require("axios");
const { Genres } = require("../db");
const key = process.env.API_KEY;

const getGenres = async () => {
  try {
    const { data } = await axios(`https://api.rawg.io/api/genres?key=${key}`);
    const genres = await data.results;
    const names = genres.map((genre) => {
      return { name: genre.name };
    });
    await Genres.bulkCreate(names);
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getGenres;
