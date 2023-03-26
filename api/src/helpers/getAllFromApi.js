const axios = require("axios");
require("dotenv").config();
const key = process.env.API_KEY;

const url = `https://api.rawg.io/api/games?key=${key}`;

const getAllFromApi = async (name) => {
  const apiGames = [];

  if (!name) {
    let page = 1;

    while (page < 6) {
      const { data } = await axios(`${url}&page=${page}`);

      const results = data.results;

      results.forEach((game) => {
        const eachGame = {
          id: game.id,
          name: game.name,
          image: game.background_image,
          platforms: game.platforms.map((plat) => plat.platform.name),
          genres: game.genres.map((genre) => genre.name),
          rating: game.rating,
        };

        apiGames.push(eachGame);
      });
      page++;
    }
    return apiGames;
  } else {
    const { data } = await axios(`${url}&search=${name}`);

    const results = data.results;

    console.log(results);
    const gamesApi = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((plat) => plat.platform.name),
        rating: game.rating,
      };
    });

    const fifteenGamesApi = gamesApi.slice(0, 15);

    return fifteenGamesApi;
  }
};

module.exports = getAllFromApi;
