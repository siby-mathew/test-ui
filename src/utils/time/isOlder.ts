export const isOlderThan = (timestamp: number, delay: number = 60 * 1000) => {
  const now = Date.now();
  return now - timestamp > delay;
};
