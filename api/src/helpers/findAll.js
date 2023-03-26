const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const url = "http://localhost:3001/uploads/";

const findAll = async (name) => {
  if (!name) {
    const results = await Videogame.findAll({
      include: { model: Genres, through: { attributes: [] } },
    });
    const dbGames = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: `${url}${game.image}`,
        platforms: game.platforms,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      };
    });
    return dbGames;
  } else {
    const gamesDb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Genres,
        through: { attributes: [] },
      },
    });
    const gamesWithImg = gamesDb.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: `${url}${game.image}`,
        platforms: game.platforms,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      };
    });
    return gamesWithImg;
  }
};

module.exports = findAll;
