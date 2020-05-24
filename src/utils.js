import dayjs from 'dayjs';

const FORMAT = 'YYYY-MM-DD';

export const timeCurrentIso8601 = () => {
  return new Date().toISOString();
};

export const getToday = () => {
  return dayjs().format(FORMAT);
};

export const formatDate = (dateStr, format = FORMAT) => {
  return dayjs(dateStr).format(format);
};

export const isPastDate = (referenceDate) => (date) => {
  // today diff => 0
  return dayjs(date).diff(referenceDate, 'days') < 0;
};
