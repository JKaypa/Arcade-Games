import axios from "axios";
import { Op } from "sequelize";
import config from "../config/config";
import { Genres } from "../models/Genres";
import { Videogames } from "../models/Videogames";
import { UploadedFile } from "express-fileupload";
import { Game, Query, Response, apiGame } from "../../types";

const key = config.apiKey
const apiUrl = config.apiURL;
const picUrl = config.picUrl


export const getAllFromDb = async (name:Query) => {
  if (!name) {
    const results = await Videogames.findAll({
      include: { model: Genres, through: { attributes: [] } },
    });
    const dbGames = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: `${picUrl}${game.image}`,
        platforms: game.platforms,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      };
    });
    return dbGames;
  } else {
    const gamesDb = await Videogames.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Genres,
        through: { attributes: [] },
      },
    });
    const gamesWithImg = gamesDb.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: `${picUrl}${game.image}`,
        platforms: game.platforms,
        genres: game.genres.map((genre) => genre.name),
        rating: game.rating,
      };
    });
    return gamesWithImg;
  }
};

export const getAllFromApi = async (name: Query) => {
  const apiGames: Game[] = [];

  if (!name) {
    let page = 1;

    while (page < 6) {
      const { data } = await axios<Response>(`${apiUrl}?key=${key}&page=${page}`);
      
      const results = data.results;
      
      
      results.forEach((game) => {
        const eachGame = {
          id: game.id,
          name: game.name,
          image: game.background_image,
          platforms: game.platforms.map(plat => plat.platform.name),
          genres: game.genres.map((genre) => genre.name),
          rating: game.rating,
        };

        apiGames.push(eachGame);
      });
      page++;
    }
    return apiGames;
  } else {
    const { data } = await axios<Response>(`${apiUrl}?search=${name}&key=${key}`);

    const results = data.results;

    const gamesApi = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((plat) => plat.platform.name),
        rating: game.rating,
      };
    });

    const fifteenGamesApi = gamesApi.slice(0, 15);

    return fifteenGamesApi;
  }
};

export const getById = async (id:string) => {
  let num = +id
  if (!isNaN(num)) { // if it is convertible into a number... true
    const { data } = await axios.get<apiGame>(`${apiUrl}/${id}?key=${key}`);

    const game = {
      name: data.name,
      image: data.background_image,
      genres: data.genres.map((genre) => genre.name),
      platforms: data.platforms.map(plat => plat.platform.name),
      rating: data.rating,
      released: data.released,
      description: data.description,
    };
    
    return game;
  } else {
    const result = await Videogames.findByPk(id, {
      include: { model: Genres, through: { attributes: [] } },
    });

    if(result instanceof Videogames){
      const game = {
        name: result.name,
        image: `${picUrl}${result.image}`,
        genres: result.genres.map((genre) => genre.name),
        platforms: result.platforms,
        rating: result.rating,
        released: result.released,
        description: result.description,
      };
      return game;
    } return 'Videogame does not exist'
  }
};

export const createGame = async (data: Game, file: UploadedFile) => {
  
  const fileName = file.name
  const path = "./src/uploads/" + fileName;
  file.mv(path);

  data.image = file.name;
  const genres = data.genres;
  delete data.genres
  
  const game = {
    name: data.name,
    platforms: data.platforms,
    released: data.released,
    description: data.description,
    rating: data.rating,
    image: data.image,
  }

  const videogames = await Videogames.create(game);
  
  const allGenres = await Genres.findAll({ where: { name: genres } });

  await videogames.$add("genres", allGenres);

  return "Videogame created succesfully. Go to home page to see it.";
};

export const updateGame = async ( id:string, data:Game, file?:UploadedFile) => { 

  const gameToUpdate: Game = {
    name: data.name,
    platforms: data.platforms,
    rating: data.rating,
    released: data.released,
    description: data.description
  }

  if(file){
    const fileName = file.name;
    const path = "./src/uploads/" + fileName;
    file.mv(path);
    gameToUpdate.image = data.image = fileName;
  }
  
  const updatedVideogame = await Videogames.findByPk(id);
  if(!updatedVideogame) {
    throw new Error('Videogame does not exist')
  }
  
  try {
    await Videogames.update(gameToUpdate, {
        where: { id },
      });
  } catch (error) {
      throw new Error('Error updating videogame')
    }

  
  const allGenres = await Genres.findAll({
        where: {
          name: { [Op.in]: data.genres },
        },
      });
  
  updatedVideogame instanceof Videogames &&  
  data.genres && 
  await updatedVideogame.$set("genres", allGenres);

  return "Videogame succesfully updated! Go to the home page or detail page to see the changes.";

};

export const deleteGame = async (id: string) => {
  await Videogames.destroy({ where: { id } });
  return "Videogame deleted succesfully!";
};
