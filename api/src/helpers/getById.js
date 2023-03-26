const axios = require("axios");
const { Videogame, Genres } = require("../db");
require("dotenv").config();
const key = process.env.API_KEY;

const url = "http://localhost:3001/uploads/";

const getById = async (id) => {
  if (!isNaN(id)) {
    const { data } = await axios(
      `https://api.rawg.io/api/games/${id}?key=${key}`
    );

    const game = {
      name: data.name,
      image: data.background_image,
      genres: data.genres.map((genre) => genre.name),
      platforms: data.platforms.map((plat) => plat.platform.name),
      rating: data.rating,
      released: data.released,
      description: data.description,
    };
    return game;
  } else {
    const result = await Videogame.findByPk(id, {
      include: { model: Genres, through: { attributes: [] } },
    });

    const game = {
      name: result.name,
      image: `${url}${result.image}`,
      genres: result.genres.map((genre) => genre.name),
      platforms: result.platforms,
      rating: result.rating,
      released: result.released,
      description: result.description,
    };
    return game;
  }
};

module.exports = getById;
