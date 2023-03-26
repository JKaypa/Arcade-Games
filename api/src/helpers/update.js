const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const updateGame = async (
  id,
  name,
  file,
  genres,
  platforms,
  rating,
  released,
  description
) => {
  const arrGenres = genres ? genres.split(",") : undefined;
  const arrPlatforms = platforms ? platforms.split(",") : undefined;
  let dataToUpdate = {
    name,
    genres: arrGenres,
    platforms: arrPlatforms,
    rating,
    released,
    description,
  };

  if (file) {
    const fileName = file.image.name;
    const path = "./src/uploads/" + fileName;
    file.image.mv(path);
    dataToUpdate.image = fileName;
  }

  try {
    await Videogame.update(dataToUpdate, {
      where: { id },
    });
  } catch (error) {
    return error;
  }

  const updatedVideogame = await Videogame.findByPk(id);
  genres && (await updatedVideogame.setGenres([]));

  const allGenres = genres
    ? await Genres.findAll({
        where: {
          name: { [Op.in]: arrGenres },
        },
      })
    : undefined;

  genres && (await updatedVideogame.addGenres(allGenres));

  return "Videogame succesfully updated! Go to the home page or detail page to see the changes.";
};

module.exports = updateGame;
