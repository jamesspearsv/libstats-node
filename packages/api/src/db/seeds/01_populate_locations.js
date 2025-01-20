/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('locations').del();
  await knex('locations').insert([
    { id: 1, value: 'Circulation' },
    { id: 2, value: 'Reference' },
    { id: 3, value: 'Childrens' },
  ]);
};
