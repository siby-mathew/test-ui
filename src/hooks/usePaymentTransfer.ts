import { BASE_TOKEN } from "@const/tokens";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toRawAmount } from "@utils/formating";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { usePrivyWallet } from "./usePrivyWallet";
import { useSolanaConnection } from "./useConnection";
import { useToast } from "./useToast";

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
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.SOL_BALANCE] });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.TOKENS] });
  };
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
          transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: provider.publicKey,
              toPubkey: recipient,
              lamports: Number(toRawAmount(amount.toString(), decimals)),
            })
          );
        }

        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = provider.publicKey;
        await wallet.sendTransaction(transaction, connection, {
          skipPreflight: false,
        });
        invalidate();
        showToast("Successfully transferred", { type: "success" });
      } catch {
        invalidate();
        showToast("Failed transfer", { type: "error" });
      }
    },
  });
};
