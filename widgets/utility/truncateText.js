export function truncateText(text) {
  if (text.length <= 25) {
    return text;
  } else {
    return text.substring(0, 25) + "...";
  }
}
