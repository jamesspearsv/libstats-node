/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('locations').del();
  await knex('locations').insert([
    {
      location_id: 1,
      location_name: 'circulation',
      location_label: 'Circulation',
    },
    { location_id: 2, location_name: 'reference', location_label: 'Reference' },
    { location_id: 3, location_name: 'childrens', location_label: 'Childrens' },
  ]);
};
