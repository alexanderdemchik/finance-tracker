import dayjs from 'dayjs';

// Check if the date is in the current month
export const isCurrentMonth = (date: Date) => {
  const now = dayjs();
  return dayjs(date).isSame(now, 'month');
};

// Check if the date is in the previous month
export const isPreviousMonth = (date: Date) => {
  const now = dayjs();
  const previousMonth = now.subtract(1, 'month');
  return dayjs(date).isSame(previousMonth, 'month');
};
