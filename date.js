const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const formatDate = (date, format) => {
  date = new Date(date);
  return format
    .replace(/YYYY/g, date.getFullYear())
    .replace(
      /YY/g,
      date
        .getFullYear()
        .toString()
        .slice(2, 4),
    )
    .replace(
      /MMMM/g,
      months[date.getMonth()][0].toUpperCase() +
        months[date.getMonth()].slice(1),
    )
    .replace(
      /MMM/g,
      months[date.getMonth()][0].toUpperCase() +
        months[date.getMonth()].slice(1, 3),
    )
    .replace(
      /MM/g,
      (date.getMonth() + 1).toString().length === 2
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`,
    )
    .replace(
      /DD/g,
      date.getDate().toString().length === 2
        ? date.getDate()
        : `0${date.getDate()}`,
    )
    .replace(
      /HH/g,
      date.getHours().toString().length === 2
        ? date.getHours()
        : `0${date.getHours()}`,
    )
    .replace(
      /mm/g,
      date.getMinutes().toString().length === 2
        ? date.getMinutes()
        : `0${date.getMinutes()}`,
    );
};

module.exports = {
  formatDate,
};
