function parseMonthRange(startMonth, endMonth) {
  // Parse inputs to extract year and month
  const [startYear, startMonthNum] = startMonth.split("-").map(Number);
  const [endYear, endMonthNum] = endMonth.split("-").map(Number);

  const dateMonthsArray = [];
  let currentYear = startYear;
  let currentMonth = startMonthNum;

  // Validate inputs
  if (
    startYear > endYear ||
    (startYear === endYear && startMonthNum > endMonthNum)
  ) {
    throw new Error("Start month must be before or equal to the end month.");
  }

  while (
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonthNum)
  ) {
    const formattedMonth = String(currentMonth).padStart(2, "0"); // Ensure 2-digit month
    dateMonthsArray.push(`${currentYear}-${formattedMonth}`);

    // Increment month and adjust year if needed
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  return dateMonthsArray;
}

module.exports = parseMonthRange;
