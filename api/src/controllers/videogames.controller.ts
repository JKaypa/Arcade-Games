import { Request, Response } from "express";
import { createGame, deleteGame, getAll, getById, updateGame } from "../service/videogames";


export const getVideogames = async (req: Request, res: Response) => {
  try {
    const { name, page } = req.query;
    const {x} = req.body
    x
    const fromDb = await getAll(name, page);
    res.json(fromDb);

  } catch (error) {

    res.status(400).send({ error: error });    
    
  }
};

export const getVideogameById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const game = await getById(id)
    res.status(200).json(game)
  } catch (error) {
    res.status(404).send({Error: 'Videogame not found'});
  }
};

export const postVideogames = async (req: Request, res: Response) => {
  try { 
    
    if(req.files && !(req.files.image instanceof Array)){
      const file = req.files.image;
      const gameCreated = await createGame(req.body, file)
      res.status(200).json(gameCreated)
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export const updateVideogame = async (req: Request, res: Response) => {  
  try {
    const { id } = req.params;
    if (req.files && !(req.files.image instanceof Array)){
      const updated = await updateGame(id, req.body, req.files.image);
      res.send(updated)      
    }
    
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteVideogame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGame(id);
    res.status(200).send(deleted);
  } catch (error) {
    res.status(404).send({ error: error });
  }
};