const getStartOfLastMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth();
  let f = new Date(year, month, 1).getDate();

  f = f < 10 ? '0' + f : f;
  month = month === 0 ? month + 1 : month;
  month = month < 10 ? '0' + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);

  return firstDay;
};

const getStartOfLastWeek = () => {
  const date = new Date();
  const first = date.getDate() - date.getDay() - 7;
  date.setDate(first);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let f = date.getDate();

  f = f < 10 ? '0' + f : f;
  month = month < 10 ? '0' + month : month;
  const firstDay = new Date(`${year}-${month}-${f}`);

  return firstDay;
};

const durationString = (duration) => {
  if (duration.toLowerCase() === 'last week') {
    const lastWeek = getStartOfLastWeek();
    return `week of ${lastWeek.toDateString()}`;
  } else if (duration.toLowerCase() === 'last month') {
    const lastMonth = getStartOfLastMonth();
    return `month of ${lastMonth.toDateString()}`;
  }
};

const getStartTime = (duration) => {
  if (duration.toLowerCase() === 'last week') {
    return getStartOfLastWeek();
  } else if (duration.toLowerCase() === 'last month') {
    return getStartOfLastMonth();
  }
};

const getEndTime = (duration, startTime) => {
  let endTime;
  const startTimeDup = new Date(startTime.getTime());
  if (duration.toLowerCase() === 'last week') {
    const last = startTimeDup.setDate(startTimeDup.getDate() + 6);
    endTime = new Date(last);
  } else if (duration.toLowerCase() === 'last month') {
    const year = startTimeDup.getFullYear();
    const month = startTimeDup.getMonth();
    endTime = new Date(year, month + 1, 0);
  }

  endTime.setHours(23);
  endTime.setMinutes(59);
  endTime.setSeconds(59);

  return endTime;
};

const filterRelevantPRs = (prs, endTime, startTime) => {
  return prs.filter(pr => {
    const mergedAt = new Date(pr.node.mergedAt).getTime();
    return (startTime.getTime() <= mergedAt && mergedAt <= endTime.getTime());
  })
};

const composeBody = (prs) => {
  return prs.map((pr) => `${pr.node.title}\n${pr.node.body}`).join("\n");
};

module.exports = {
  getStartTime,
  getEndTime,
  filterRelevantPRs,
  durationString,
  composeBody
};
