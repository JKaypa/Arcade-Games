const createGame = require('../helpers/create')

const postVideogames = async (req, res) => {
  try {
    const file = req.files.image;
    const { name, description, platforms, released, rating, genres } = req.body;
    const gameCreated = await createGame(name, file, description, platforms, released, rating, genres)
    res.status(200).json(gameCreated)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = postVideogames