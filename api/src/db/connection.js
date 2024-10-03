// Init db connection with knex
const config = require('../../knexfile');
const db = require('knex')(config[process.env.NODE_ENV || 'development']);

module.exports = db;
