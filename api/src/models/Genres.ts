import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  Unique,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import { Videogames } from "./Videogames";
import { Arcade } from "./Arcade";

@Table({timestamps: false})
export class Genres extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @AllowNull
  @Column(
    DataType.ENUM(
      "Action",
      "Indie",
      "Adventure",
      "RPG",
      "Strategy",
      "Shooter",
      "Casual",
      "Simulation",
      "Puzzle",
      "Arcade",
      "Platformer",
      "Racing",
      "Massively Multiplayer",
      "Sports",
      "Fighting",
      "Family",
      "Board Games",
      "Educational",
      "Card"
    )
  )
  name!: string;

  @BelongsToMany(() => Videogames, () => Arcade)
  videogames!: Videogames[]
}
