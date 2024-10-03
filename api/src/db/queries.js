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

module.exports = { selectInteractions };
