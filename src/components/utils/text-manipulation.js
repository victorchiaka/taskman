export const capitalize = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}