const { Videogame } = require("../db");

const deleteGame = async(id) =>{
  await Videogame.destroy({ where: { id } });
  return "Videogame deleted succesfully!"
}

module.exports = deleteGame;