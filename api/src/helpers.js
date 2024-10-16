// Helper functions used throughout app
function getDateToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const today = `${year}-${month}-${day}`;
  return today;
}

module.exports = {
  getDateToday,
};
