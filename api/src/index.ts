import app from "./app";
import { sequelize } from "./dataBase/db";
import config from "./config/config";
const PORT = config.port;


(async function () {
  try {
    await sequelize.sync({force: false});
    app.listen(PORT)
    console.log('DataBase connected, server listening on port', PORT);
  } catch (error) {
    console.error('***Connection failed !!***');
    console.error({message: error}); 
  }
})()

