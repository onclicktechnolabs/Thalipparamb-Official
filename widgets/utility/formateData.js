export const formatDate = (timestamp) => {
  console.log(
    "🚀 ~ file: formateData.js:2 ~ formatDate ~ timestamp:",
    timestamp
  );
  const date = timestamp.toDate();
  return date.toLocaleDateString();
};
