/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('interactions').del();
  await knex('interactions').insert([
    { location_id: 3, type_id: 2, format_id: 1 },
    { location_id: 2, type_id: 3, format_id: 1 },
    { location_id: 1, type_id: 1, format_id: 1 },
    { location_id: 3, type_id: 2, format_id: 1 },
    { location_id: 2, type_id: 3, format_id: 1 },
  ]);
};