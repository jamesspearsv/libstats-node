/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('types', (table) => {
      table.increments('type_id').notNullable();
      table.string('type_name').notNullable();
      table.string('type_label').notNullable();
    })
    .createTable('locations', (table) => {
      table.increments('location_id').notNullable();
      table.string('location_name').notNullable();
      table.string('location_label').notNullable();
    })
    .createTable('interactions', (table) => {
      table.increments('interaction_id').notNullable();
      table.integer('type_id').notNullable();
      table.integer('location_id').notNullable();
      table.foreign('type_id').references('types.type_id');
      table.foreign('location_id').references('locations.location_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('interactions')
    .dropTableIfExists('types')
    .dropTableIfExists('locations');
};
