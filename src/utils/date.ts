export const formatDate = (date: Date | string) => {
  const formatted = typeof date === "string" ? new Date(date) : date;

  const year = formatted.getFullYear();
  const month = String(formatted.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
  return `${year}-${month}`;
};

export const formatYear = (date: string) => {
  return date.split("-")[0];
};

export function getYearsSince(dateString: string) {
  const [year, month] = dateString.split("-").map(Number);
  const startDate = new Date(year, month - 1); // month is 0-indexed in JS Date
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  // Adjust if the current month/day is before the start month/day
  if (
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate())
  ) {
    years--;
  }

  return years;
}
