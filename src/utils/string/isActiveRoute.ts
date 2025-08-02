export const isActive = (id: string, path: string) => {
  if (id && path && path.indexOf(`/${id}`) > -1) {
    return !0;
  }
  return !1;
};
