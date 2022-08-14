const today = new Date();
export const beginningOfLastMonth = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  1
);
export const endOfMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
);

export const formatForView = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
