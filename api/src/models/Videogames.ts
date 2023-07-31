import {
  Table,
  Model,
  Column,
  DataType,
  Default,
  PrimaryKey,
  AllowNull,
  Unique,
} from "sequelize-typescript";


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

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  genres!: string[];

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
  

  @AllowNull(false)
  @Column(DataType.TEXT())
  description!: string

}
