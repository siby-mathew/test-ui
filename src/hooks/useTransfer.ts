import { useMutation } from "@tanstack/react-query";

import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { QueryKeys } from "src/types";

export const useTransfer = () => {
  const { provider } = useGetMailProgramInstance();

  return useMutation({
    mutationKey: [QueryKeys.TRANSFER],
    mutationFn: async ({ to, amount }: { to: string; amount: number }) => {
      if (!provider || !provider.publicKey) {
        return alert("Wallet not connected");
      }
      const sender = provider.wallet.publicKey;
      const connection = provider.connection;
      const recipient = new PublicKey(to);

      const lamports = amount * LAMPORTS_PER_SOL;

      const ix = SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = sender;

      const latestBlockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;

      const signedTx = await provider.wallet.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      await connection.confirmTransaction(txid, "confirmed");

      return txid;
    },
  });
};
