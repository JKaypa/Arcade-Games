import { Request, Response } from "express";
import { createGame, deleteGame, getAllFromApi, getAllFromDb, getById, updateGame } from "../service/videogames";
import { Game } from "../../types";
import { UploadedFile } from "express-fileupload";



export const getVideogames = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const fromApi = await getAllFromApi(name);
    const fromDb = await getAllFromDb(name);
    const mixData = [...fromDb, ...fromApi];
    res.json(mixData);
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
    res.status(404).send({ error: error });
  }
};

export const postVideogames = async (req: Request, res: Response) => {
  try { 
    if(req.files && !(req.files.image instanceof Array)){
      const file: UploadedFile = req.files.image;
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
    const data:Game = req.body;
    const file: UploadedFile | undefined = 
    req.files && !(req.files.image instanceof Array) ? 
    req.files.image : undefined;
    
    const updated = await updateGame(id, data, file);
    res.status(200).send(updated)
    
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