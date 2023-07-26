import app from "./app";
import { sequelize } from "./dataBase/db";
import { getGenres } from "./controllers/genres.controller";
import config from "./config/config";
const PORT = config.port;


(async function () {
  try {
    await sequelize.sync({force: false});
    await getGenres();
    app.listen(PORT)
    console.log('DataBase connected, server listening on port', PORT);
  } catch (error) {
    console.error('***Connection failed !!***');
    console.error({message: error}); 
  }
})()

