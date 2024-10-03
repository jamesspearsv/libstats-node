const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = require('../knexfile');
const knex = require('knex');
const db = knex(config[NODE_ENV]);

app.use((req, res, next) => {
  console.log(`${new Date()} -- URL: ${req.url}`);
  next();
});

app.get('/', async (req, res) => {
  const rows = await db
    .select(
      'interactions.interaction_id',
      'types.type_name',
      'locations.location_name'
    )
    .from('interactions')
    .join('types', 'interactions.type_id', '=', 'types.type_id')
    .join(
      'locations',
      'interactions.location_id',
      '=',
      'locations.location_id'
    );
  res.json(rows);
});

app.listen(PORT, () => {
  console.log('##########################');
  console.log(`- Running in ${NODE_ENV} mode`);
  console.log(`- Server listening on port ${PORT}`);
  console.log('##########################');
});
