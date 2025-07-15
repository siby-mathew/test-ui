import { PublicKey } from "@solana/web3.js";

export const isValidAddress = (addrs:string)=>{
    try {
      var s = new PublicKey(addrs);
      if(s) return true;else return false;
    } catch (error) {
      return false;
    }
  }