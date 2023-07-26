import cors from "cors";
import fileupload from "express-fileupload";
import express from "express";
import router from "./routes/videogames";
import path from "path";


const app = express();


app.use(fileupload());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(cors());
app.use("/api/videogames", router);




export default app