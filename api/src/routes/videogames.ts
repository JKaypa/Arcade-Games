import { Router } from "express";
import { deleteVideogame, getVideogameById, getVideogames, postVideogames, updateVideogame } from "../controllers/videogames.controller";
import { parse } from "../middlewares/parse";

const router = Router();


router.get("/", getVideogames);

router.get("/:id", getVideogameById);

router.post("/", parse, postVideogames);

router.put("/:id", parse, updateVideogame);

router.delete("/:id", deleteVideogame);

export default router
