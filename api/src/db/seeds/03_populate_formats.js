/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('formats').del();
  await knex('formats').insert([
    { id: 1, value: 'In-Person' },
    { id: 2, value: 'Phone' },
    { id: 3, value: 'Virtual' },
  ]);
};
