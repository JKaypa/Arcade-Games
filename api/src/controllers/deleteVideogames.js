const deleteGame = require("../helpers/delete");

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGame(id);
    res.status(200).send(deleted);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = deleteVideogame;
