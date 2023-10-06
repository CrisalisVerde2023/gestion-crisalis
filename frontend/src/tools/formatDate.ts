export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateToInput = (dateString: string): string => {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

export const convertDateString = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};
