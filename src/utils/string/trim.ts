export const trim = (
  str: string,
  maxLength: number = 20,
  ellipsis: string = "..."
) => {
  if (!str || str.length < maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength)}${ellipsis}`;
};
