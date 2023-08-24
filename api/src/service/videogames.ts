import { Op } from "sequelize";
import config from "../config/config";
import { Videogames } from "../models/Videogames";
import { UploadedFile } from "express-fileupload";
import { Game, Query, QueryOptions } from "../../types";

const picUrl = config.picUrl;

export const getAll = async (
  name: Query,
  genre: Query,
  platform: Query,
  rating: Query,
  page: Query = 1
) => {
  page = parseInt(page);
  const limit = 12;
  const options: QueryOptions = { offset: (page - 1) * limit, limit: limit, order: [['name', 'ASC']] };

  if (name) {
    options.where
      ? (options.where.name = { [Op.iLike]: `${name}%` })
      : (options.where = { name: { [Op.iLike]: `${name}%` } });
  } 
  if (genre) {
    options.where
      ? (options.where.genres = { [Op.contains]: [genre] })
      : (options.where = { genres: { [Op.contains]: [genre] } });
  } 
  if (platform) {
    options.where
      ? (options.where.platforms = { [Op.contains]: [platform] })
      : (options.where = { platforms: { [Op.contains]: [platform] } });
  }
  if (rating){
    options.order = [['rating', rating]]
  }

  const { count, rows } = await Videogames.findAndCountAll(options);
  return { page, count, rows };
};

export const getById = async (id: string) => {
  return await Videogames.findByPk(id);
};

export const createGame = async (data: Partial<Game>, file: UploadedFile) => {
  const path = "./src/uploads/" + file.name;
  file.mv(path);
  data.image = picUrl + file.name;

  await Videogames.create(data);

  return "Videogame created succesfully. Go to home page to see it.";
};

export const updateGame = async (
  id: string,
  data: Game,
  file?: UploadedFile | UploadedFile[] | null
) => {
  if (file && !(file instanceof Array)) {
    const path = "./src/uploads/" + file.name;
    file.mv(path);
    data.image = picUrl + file.name;
  }

  try {
    await Videogames.update(data, { where: { id } });
  } catch (error) {
    throw new Error("Error updating videogame");
  }

  return "Videogame succesfully updated! Go to the home page or detail page to see the changes.";
};

export const deleteGame = async (id: string) => {
  await Videogames.destroy({ where: { id } });
  return "Videogame deleted succesfully!";
};

