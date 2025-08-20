import isString from "lodash/isString";

export const shortenPrincipalId = (
  principal: string | undefined,
  front: number = 4,
  back: number = 4
) => {
  if (!principal || principal.length <= front + back + 3) return principal;
  return `${principal.slice(0, front)}...${principal.slice(-back)}`;
};

export const trim = (
  str: string,
  maxLength: number = 10,
  ellipsis = "...",
  defaultVal: string = ""
) => {
  if (!str || !isString(str)) {
    return defaultVal;
  }
  if (str.length < maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength)}${ellipsis}`;
};
