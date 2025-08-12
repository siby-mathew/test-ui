import { BASE_TOKEN } from "@const/tokens";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { toRawAmount } from "@utils/formating";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import { useSolanaConnection } from "./useConnection";
import { useToast } from "./useToast";
import { createTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";
type PayLoad = {
  to: string;
  amount: string;
  token: string;
  decimals: number;
};
export const usePaymentTransfer = () => {
  const { provider } = useGetMailProgramInstance();
  const { isConnected: connected, wallet } = usePrivyWallet();

  const connection = useSolanaConnection();
  const { showToast } = useToast();

  return useMutation({
    mutationKey: [QueryKeys.PAYMENT_TRANSFER],
    mutationFn: async ({ to, amount, token, decimals }: PayLoad) => {
      if (!provider || !wallet || !connection || !connected) {
        return !0;
      }

      if (!amount) return;

      const splToken =
        token !== BASE_TOKEN.address ? new PublicKey(token ?? "") : null;
      const recipient = new PublicKey(to);
      const _amount = new BigNumber(amount ?? "0");
      try {
        let transaction: Transaction;

        if (splToken) {
          const fromTokenAccount = await getAssociatedTokenAddress(
            splToken,
            provider.publicKey
          );
          const toTokenAccount = await getAssociatedTokenAddress(
            splToken,
            recipient
          );

          const tx = new Transaction();

          const ataInfo = await connection.getAccountInfo(toTokenAccount);
          if (!ataInfo) {
            const createATAIx = createAssociatedTokenAccountInstruction(
              provider.publicKey,
              toTokenAccount,
              recipient,
              splToken
            );
            tx.add(createATAIx);
          }

          const transferIx = createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            provider.publicKey,
            Number(toRawAmount(amount.toString(), decimals))
          );

          tx.add(transferIx);
          transaction = tx;
        } else {
          transaction = await createTransfer(
            connection,
            provider.publicKey,
            {
              recipient,
              amount: _amount,
              reference: Keypair.generate().publicKey,
            },
            { commitment: "confirmed" }
          );
        }

        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = provider.publicKey;
        await wallet.sendTransaction(transaction, connection, {
          skipPreflight: false,
        });

        showToast("Successfully transferred", { type: "success" });
      } catch {
        showToast("Failed transfer", { type: "error" });
      }
    },
  });
};
