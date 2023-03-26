const getAllFromApi = require("../helpers/getAllFromApi");
const findAll = require("../helpers/findAll");

const getVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const fromApi = await getAllFromApi(name);
    const fromDb = await findAll(name);
    const mixData = [...fromDb, ...fromApi];
    res.status(200).json(mixData);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getVideogames;
