export const formatDate = (date: Date | string) => {
  const formatted = typeof date === "string" ? new Date(date) : date;

  const year = formatted.getFullYear();
  const month = String(formatted.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
  return `${year}-${month}`;
};

export function getDateDiffString(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);

  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return [years ? `${years} m.` : "", months ? `${months} mėn.` : ""]
    .filter(Boolean)
    .join(" ");
}
