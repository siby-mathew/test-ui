export const getStorageURLByVersion = (version: string, path: string) => {
  if (version !== "0.0.5") {
    return `${import.meta.env.VITE_SOLMAIL_IRYS_BASE_URL}${path}`;
  } else {
    return `${import.meta.env.VITE_SOLMAIL_PINATA_GATEWAY_URL}${path}`;
  }
};
