import { useEffect, useState } from "react";
import { useSolanaConnection } from "./useConnection";
import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedMessage,
} from "@solana/web3.js";
import { usePrivyWallet } from "./usePrivyWallet";

export const useEstimatedFee = () => {
  const { address: fromPubkey } = usePrivyWallet();
  const [fee, setFee] = useState<number>(5000);
  const connection = useSolanaConnection();

  useEffect(() => {
    const loadFee = async () => {
      try {
        if (!connection || !fromPubkey) return;
        const latestBlockhash = await connection.getLatestBlockhash();
        const messageV0: VersionedMessage = new TransactionMessage({
          payerKey: new PublicKey(fromPubkey),
          recentBlockhash: latestBlockhash.blockhash,
          instructions: [
            SystemProgram.transfer({
              fromPubkey: new PublicKey(fromPubkey),
              toPubkey: new PublicKey(fromPubkey),
              lamports: 0,
            }),
          ],
        }).compileToV0Message();
        const { value } = await connection.getFeeForMessage(messageV0);
        if (value != null) {
          setFee(value);
        }
      } catch {
        return 0;
      }
    };
    loadFee();
  }, [connection, fromPubkey]);
  return { fee };
};
