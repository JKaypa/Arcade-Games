import path from 'path'
import {Sequelize} from 'sequelize-typescript'
import config from '../config/config'

const models = path.join(__dirname, '../models')
export const sequelize = new Sequelize({
  logging: false,
  dialect: 'postgres',
  database: config.dbName,
  username: config.dbUser,
  password: config.password,
  storage: ':memory:',
  models: [models],
})


