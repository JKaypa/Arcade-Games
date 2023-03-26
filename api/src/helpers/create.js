const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");


const createGame = async (name, file, description, platforms, released, rating, genres) => {

  const fileName = file.name;
  const path = "./src/uploads/" + fileName;
  file.mv(path);
    
  const genresArr = genres.split(",");
  const platformsArr = platforms.split(",");
  const videogames = await Videogame.create({
    name,
    description,
    platforms: platformsArr,
    image: fileName,
    released,
    rating,
  });

  const nameGenres = await Genres.findAll({
    where: { name: { [Op.in]: genresArr } },
  });

  await videogames.addGenres(nameGenres);
  return 'Videogame created succesfully. Go to home page to see it.'
}

module.exports = createGame;