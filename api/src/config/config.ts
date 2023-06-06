require('dotenv').config()



const config = {
  picUrl: process.env.PIC_URL,
  apiURL: process.env.API_URL,
  dbUser: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  apiKey: process.env.API_KEY,
  port: process.env.PORT || 3001

}

export default config

