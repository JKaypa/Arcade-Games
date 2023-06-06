import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AllowNull,
  Unique,
  BelongsToMany,
} from "sequelize-typescript";
import { Genres } from "./Genres";
import { Arcade } from "./Arcade";



@Table({ timestamps: false })
export class Videogames extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  platforms!: string[];

  @Unique
  @AllowNull(false)
  @Column
  image!: string;

  @AllowNull(false)
  @Column
  released!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  rating!: string;
  
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(1000))
  description!: string

  @BelongsToMany(() => Genres, () => Arcade)
  genres!: Genres[]
}
