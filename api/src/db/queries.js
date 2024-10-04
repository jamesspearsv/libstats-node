const db = require('./connection');

async function selectInteractions() {
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

  return rows;
}

async function selectLocations(req, res) {
  const rows = db.select('*').from('locations');
  return rows;
}
async function selectTypes(req, res) {
  const rows = db.select('*').from('types');
  return rows;
}

module.exports = { selectInteractions, selectLocations, selectTypes };
