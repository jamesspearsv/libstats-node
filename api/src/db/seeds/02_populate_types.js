/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('types').del();
  await knex('types').insert([
    { type_name: 'directional', type_label: 'Directional' },
    { type_name: 'digital resources', type_label: 'Digital Resources' },
    { type_name: 'known-item requests', type_label: 'Known-Item Requests' },
    { type_name: 'information services', type_label: 'Information Services' },
    { type_name: 'tech help', type_label: 'Tech Help' },
  ]);
};
