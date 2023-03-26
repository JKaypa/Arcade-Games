const { Router } = require("express");
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const postVideogames = require('../controllers/postVideogames')
const updateVideogame = require('../controllers/updateVideogame')
const deleteVideogame = require('../controllers/deleteVideogames')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getVideogames);
router.get("/videogames/:id", getVideogameById);
router.post("/videogames", postVideogames);
router.put("/videogames/:id", updateVideogame);
router.delete("/videogames/:id", deleteVideogame);

module.exports = router;
