import { PublicKey } from "@solana/web3.js";
export const isPublicKey = (value: string | undefined) => {
  if (!value || !value.trim()) {
    return !1;
  }
  try {
    new PublicKey(value);
    return !0;
  } catch {
    return !1;
  }
};
