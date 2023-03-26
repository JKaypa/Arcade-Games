const updateGame = require('../helpers/update')

const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genres, platforms, rating, released, description } = req.body;
    const file = req.files;
    const updated = await updateGame(id, name, file, genres, platforms, rating, released, description);
    res.status(200).send(updated)
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = updateVideogame;
