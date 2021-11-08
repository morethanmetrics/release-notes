const getStartOfLastMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth();
  let f = new Date(year, month, 1).getDate();

  f = f < 10 ? '0' + f : f;
  month = month === 0 ? month + 1 : month
  month = month < 10 ? '0' + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);

  return firstDay;
};

const getStartOfLastWeek = () => {
  const date = new Date();
  const first = date.getDate() - date.getDay() - 7
  date.setDate(first)
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = date.getDate();

  f = f < 10 ? '0' + f : f;
  month = month < 10 ? '0' + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);

  return firstDay;
}

const durationString = (duration) => {
  if (duration.toLowerCase() === 'last week') {
    const lastWeek = getStartOfLastWeek()
    return lastWeek.toDateString()
  } else if (duration.toLowerCase() === 'last month') {
    const lastMonth = getStartOfLastMonth()
    return lastMonth.toDateString()
  }
}

module.exports = {
  getStartOfLastMonth,
  getStartOfLastWeek,
  durationString
}
