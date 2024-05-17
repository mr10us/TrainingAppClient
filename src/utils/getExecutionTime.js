// get execution time from Date obj
export const getExecTime = (dateObj) => {
  const date = new Date(dateObj);
  
  const padZero = (num) => (num < 10 ? "0" : "") + num;

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};
