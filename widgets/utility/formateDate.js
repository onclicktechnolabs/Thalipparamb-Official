export const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  timeZone: 'Asia/Kolkata',
};


export const formatToLocalDate = (date) => {
  const formattedDate = date.toLocaleString('en-IN', dateOptions);
  return formattedDate
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate
};
