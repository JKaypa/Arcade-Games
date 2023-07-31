import axios from "axios";
import { Response, apiGame } from "../../types";
import config from "../config/config";
import { Videogames } from "../models/Videogames";

const key = process.env.API_KEY;
const apiUrl = config.apiURL;

export const getAllFromApi = async () => {
  
  const games: string[] = []
  let page = 1;

  while (page < 12) {

      const { data } = await axios<Response>(`${apiUrl}?key=${key}&page=${page}`);
      
      const results = data.results;
      
      results.forEach(async (game) => {        
        games.push(game.id!)
      });

      page++;
    }
  
  for (const id in games) {
    
    const { data } = await axios<apiGame>(`${apiUrl}/${games[id]}?key=${key}`);
    
    const eachGame = {
        name: data.name,
        genres: data.genres.map(genre => genre.name),
        platforms: data.platforms.map(plat => plat.platform.name),
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        description: data.description
      }
    console.log(eachGame);
    
    await Videogames.create(eachGame)
    }
   
}

