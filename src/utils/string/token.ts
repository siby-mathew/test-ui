export const STORAGE_NAME = "auth:token";
export const getToken = (): string | boolean => {
  const val = localStorage.getItem(STORAGE_NAME);
  return val && val.trim() ? val.trim() : !1;
};
