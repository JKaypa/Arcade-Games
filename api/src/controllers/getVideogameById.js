
const getById = require ('../helpers/getById')

const getVideogameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await getById(id)
    res.status(200).json(game)
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getVideogameById;
