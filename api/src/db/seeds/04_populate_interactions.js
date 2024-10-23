/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { getDateToday } = require('../../helpers.js');

// const date = new Date();

// const year = date.getFullYear();
// const month = ('0' + (date.getMonth() + 1)).slice(-2);
// const day = ('0' + date.getDate()).slice(-2);

// const today = `${year}-${month}-${day}`;

const today = getDateToday();

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('interactions').del();
  // await knex('interactions').insert([
  //   { location_id: 1, type_id: 1, format_id: 1, date: today },
  //   { location_id: 1, type_id: 5, format_id: 1, date: today },
  //   { location_id: 2, type_id: 4, format_id: 2, date: today },
  //   { location_id: 2, type_id: 3, format_id: 2, date: today },
  //   { location_id: 3, type_id: 2, format_id: 3, date: today },
  //   { location_id: 3, type_id: 1, format_id: 3, date: today },
  // ]);
};
