import { useMemo } from "react";
import { Connection } from "@solana/web3.js";
import { RPC_ENDPOINT } from "@const/config";

let cachedConnection: Connection | null = null;

export function useSolanaConnection() {
  const connection = useMemo(() => {
    if (!cachedConnection) {
      cachedConnection = new Connection(RPC_ENDPOINT, {
        commitment: "confirmed",
      });
    }
    return cachedConnection;
  }, []);

  return connection;
}
