export const getSolscanUrl = (
  path: string,
  type: "address" | "tx" | "account" = "address",
  cluster?: string
) => {
  return `${import.meta.env.VITE_SOLMAIL_SOLSCAN_BASE}${type}/${path}?cluster=${cluster || import.meta.env.VITE_SOLMAIL_CLUSTER}`;
};

export const getSolscanAddress = (address: string, cluster?: string) => {
  return getSolscanUrl(address, "address", cluster);
};

export const getSolScanTxUrl = (address: string) => {
  return getSolscanUrl(address, "tx");
};

export const getSolScanAccountUrl = (address: string) => {
  return getSolscanUrl(address, "account");
};
