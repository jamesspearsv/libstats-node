/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("types", (table) => {
      table.increments("id").notNullable();
      table.string("value").notNullable();
      table.text("desc").notNullable();
    })
    .createTable("locations", (table) => {
      table.increments("id").notNullable();
      table.string("value").notNullable();
    })
    .createTable("formats", (table) => {
      table.increments("id").notNullable();
      table.string("value").notNullable();
    })
    .createTable("interactions", (table) => {
      table.increments("id").notNullable();
      table.integer("type_id").notNullable();
      table.integer("location_id").notNullable();
      table.integer("format_id").notNullable();
      table.date("date").notNullable();
      table.foreign("type_id").references("types.id").onDelete("CASCADE");
      table.foreign("format_id").references("formats.id").onDelete("CASCADE");
      table
        .foreign("location_id")
        .references("locations.id")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("interactions")
    .dropTableIfExists("types")
    .dropTableIfExists("locations")
    .dropTableIfExists("formats");
};
