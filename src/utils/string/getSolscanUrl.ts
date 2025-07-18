export const getSolscanUrl = (
  path: string,
  type: "address" | "tx" | "account" = "address"
) => {
  return `${import.meta.env.VITE_SOLMAIL_SOLSCAN_BASE}${type}/${path}?cluster=${import.meta.env.VITE_SOLMAIL_CUSTER}`;
};

export const getSolscanAddress = (address: string) => {
  return getSolscanUrl(address, "address");
};

export const getSolScanTxUrl = (address: string) => {
  return getSolscanUrl(address, "tx");
};

export const getSolScanAccountUrl = (address: string) => {
  return getSolscanUrl(address, "account");
};
