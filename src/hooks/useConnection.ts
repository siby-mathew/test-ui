import { useMemo } from "react";
import { Connection } from "@solana/web3.js";

let cachedConnection: Connection | null = null;

export function useSolanaConnection() {
  const connection = useMemo(() => {
    if (!cachedConnection) {
      cachedConnection = new Connection(
        import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT,
        {
          commitment: "confirmed",
        }
      );
    }
    return cachedConnection;
  }, []);

  return connection;
}
