/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('types').del();
  await knex('types').insert([
    { type_id: 1, type_name: 'directional', type_label: 'Directional' },
    {
      type_id: 2,
      type_name: 'digital resources',
      type_label: 'Digital Resources',
    },
    {
      type_id: 3,
      type_name: 'known-item requests',
      type_label: 'Known-Item Requests',
    },
    {
      type_id: 4,
      type_name: 'information services',
      type_label: 'Information Services',
    },
    { type_id: 5, type_name: 'tech help', type_label: 'Tech Help' },
  ]);
};
