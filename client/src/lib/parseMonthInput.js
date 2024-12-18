/**
 * Validates dates strings for YYYY-MM format
 * @param {Array<string>} inputs
 * @returns {Array<boolean>}
 */

export default function parseMonthInput(inputs) {
  const regex = /[0-9]{4}-[0-9]{2}/;
  const results = [];
  for (const input of inputs) {
    const match = input.match(regex);

    if (!match || match[0] !== input) results.push(false);
    else results.push(true);
  }

  return results;
}
