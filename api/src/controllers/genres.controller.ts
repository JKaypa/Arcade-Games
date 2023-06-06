import axios from "axios";
import { Genres } from "../models/Genres";

const key = process.env.API_KEY;

type apiGenre = {
  name: string;
};

interface apiResponse {
  results: apiGenre[];
}

export const getGenres = async (): Promise<void> => {
  try {
    const { data } = await axios<apiResponse>(
      `https://api.rawg.io/api/genres?key=${key}`
    );
    const genres = data.results;
    const names = genres.map((genre): apiGenre => {
      return { name: genre.name };
    });

    await Genres.bulkCreate(names);
  } catch (error) {
   
  }
};
