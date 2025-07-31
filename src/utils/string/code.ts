export const validateCode = (value: string) => {
  if (!value || !value.trim()) {
    return !0;
  }
  if (value.length !== 8) {
    return `Enter a valid referal code`;
  }
  return !0;
};
