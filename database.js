require('dotenv').config()

const {
  DB_HOST = '',
  DB_USERNAME = '',
  DB_PASSWORD = '',
  DB_DATABASE = ''
} = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_DATABASE}_development`,
    host: DB_HOST,
    dialect: 'postgres',
    port: 5433
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_DATABASE}_test`,
    host: DB_HOST,
    dialect: 'postgres',
    port: 5433
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_DATABASE}_production`,
    host: DB_HOST,
    dialect: 'postgres',
    port: 5433
  }
}
