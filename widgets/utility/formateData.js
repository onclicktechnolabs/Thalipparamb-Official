export const formatDate = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString();
};
