import { PublicKey } from "@solana/web3.js";

export const isValidAddress = (addrs: string) => {
  try {
    const s = new PublicKey(addrs);
    if (s) return true;
    else return false;
  } catch {
    return false;
  }
};
