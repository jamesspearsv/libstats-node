/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('types').del();
  await knex('types').insert([
    {
      id: 1,
      value: 'Directional',
      desc: 'Simple questions about facilities, hours, etc.',
    },
    {
      id: 2,
      value: 'Digital Resources',
      desc: 'Questions about accessing and using MPL digital resources.',
    },
    {
      id: 3,
      value: 'Known-Item Requests',
      desc: 'Patron questions about specific items (known-items).',
    },
    {
      id: 4,
      value: 'Information Services',
      desc: 'General reference questions and questions about library cards or services.',
    },
    {
      id: 5,
      value: 'Tech Help',
      desc: 'Requests for help using public computers or other tech questions',
    },
  ]);
};
