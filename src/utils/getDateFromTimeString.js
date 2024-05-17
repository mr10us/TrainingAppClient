export const getDateFromTimeString = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  const now = new Date();

  now.setHours(hours, minutes, seconds, 0);

  return now;
}