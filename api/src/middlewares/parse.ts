import { Request, Response, NextFunction } from "express";

export const parse = (req: Request, _res: Response, next: NextFunction) => {
  const genres: string = req.body.genres;
  const platforms: string = req.body.platforms;
  const genresParsed: string[] = JSON.parse(genres);
  const platformsParsed: string[] = JSON.parse(platforms);
  req.body.genres = genresParsed;
  req.body.platforms = platformsParsed;
  next();
};
