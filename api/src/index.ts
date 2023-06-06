import cors from "cors";
import fileupload from "express-fileupload";
import express from "express";
import config from "./config/config";
import { sequelize } from "./dataBase/db";
import { getGenres } from "./controllers/genres.controller";
import router from "./routes/videogames";
import path from "path";




const app = express();
const PORT = config.port;

app.use(fileupload());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(cors());
app.use("/api/videogames", router);



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