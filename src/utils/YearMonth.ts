export type YearMonth = string;

export const getMaximumMonth = (yearMonths: YearMonth[]): YearMonth => {
  var yearMonthsSorted = [...yearMonths];
  return yearMonthsSorted.sort().reverse()[0];
};

export const makeYearMonth = (year: number, month: number): YearMonth => {
  return year + "-" + String(month).padStart(2, "0");
};

export const parseYearMonth = (yearMonth: YearMonth): [number, number] => {
  const [year, month] = yearMonth.split("-");
  return [Number(year), Number(month)];
};

// Returns the 1-indexed [year, month] pair for last month.
export const getPreviousMonth = (date: Date): YearMonth => {
  // 2022
  const year = date.getUTCFullYear();

  // Zero indexed
  const month = date.getUTCMonth();

  if (month === 0) {
    return makeYearMonth(year - 1, 12);
  } else {
    // This month is 0 indexed.  So, to subtract 1 and convert
    // to 1 indexed, we just return month.
    return makeYearMonth(year, month);
  }
};

// Returns the 1-indexed [year, month] pair for n months ago.
// The input year, month are 1-indexed;
export const nMonthsAgo = (yearMonth: YearMonth, n: number): YearMonth => {
  var [year, month] = parseYearMonth(yearMonth);

  // Go to the end of the previous year
  if (n >= month) {
    n -= month;
    year -= 1;
    month = 12;
  }

  const num_years = Math.floor(n / 12);
  const remainder_months = n - num_years * 12;

  return makeYearMonth(year - num_years, month - remainder_months);
};

// Inclusive
export const monthRange = (
  startYearMonth: YearMonth,
  endYearMonth: YearMonth
): YearMonth[] => {
  const [startYear, startMonth] = parseYearMonth(startYearMonth);
  const [endYear, endMonth] = parseYearMonth(endYearMonth);

  if (startYear > endYear) {
    throw new Error("Bad input");
  }

  if (startYear === endYear && startMonth > endMonth) {
    throw new Error("Bad input");
  }

  const yearMonths: YearMonth[] = [];
  var currentYear = startYear;
  var currentMonth = startMonth;
  while (true) {
    yearMonths.push(makeYearMonth(currentYear, currentMonth));

    if (currentYear === endYear && currentMonth === endMonth) {
      break;
    }

    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }
  }

  return yearMonths;
};
