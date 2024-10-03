const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date()} -- URL: ${req.url}`);
  next();
});

const db = require('./db/connection');

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
