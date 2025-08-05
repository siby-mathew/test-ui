import { PublicKey, Connection } from "@solana/web3.js";
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";

import { isValidAddress } from "./isValidAddress";
import { TldParser } from "@onsol/tldparser";

export const resolveEmail = async (
  address: string,
  con: Connection
): Promise<PublicKey | null | undefined> => {
  if (isValidAddress(address)) {
    try {
      return new PublicKey(address);
    } catch (e) {
      return null;
    }
  }

  if (address.endsWith(".sol")) {
    try {
      const { pubkey } = getDomainKeySync(address);
      const nameRegistry = await NameRegistryState.retrieve(con, pubkey);
      return nameRegistry?.registry?.owner ?? null;
    } catch (error) {
      return null;
    }
  }

  if (address.includes(".")) {
    const allDomainParser = new TldParser(con);
    try {
      const pubKey = await allDomainParser.getOwnerFromDomainTld(address);
      return pubKey ? new PublicKey(pubKey) : null;
    } catch (error) {
      return null;
    }
  }

  return null;
};
