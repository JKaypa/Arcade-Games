import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Videogames } from "./Videogames";
import { Genres } from "./Genres";

@Table
export class Arcade extends Model {
  @ForeignKey(() => Videogames)
  @Column
  videogamesId!: string;

  @ForeignKey(() => Genres)
  @Column
  GenresId!: string;
}
