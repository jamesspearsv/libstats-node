/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('types').del();
  await knex('types').insert([
    { id: 1, value: 'Directional', desc: '' },
    { id: 2, value: 'Digital Resources', desc: '' },
    { id: 3, value: 'Known-Item Requests', desc: '' },
    { id: 4, value: 'Information Services', desc: '' },
    { id: 5, value: 'Tech Help', desc: '' },
  ]);
};
