const { Sequelize } = require('sequelize');
require('dotenv').config();
const JAWSDB_URL = process.env.JAWSDB_URL;

const sequelize = JAWSDB_URL ? new Sequelize(JAWSDB_URL): new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || '', {
  host: process.env.DB_HOST_URL,
  dialect: 'mysql'
});


module.exports = sequelize