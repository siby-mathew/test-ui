import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";

import { useHttp } from "@hooks/useHttp";
import { VersionedTransaction } from "@solana/web3.js";
import { useSignTransaction } from "@privy-io/react-auth/solana";
import { useSolanaConnection } from "./useConnection";
import { useToast } from "@hooks/useToast";

type SponsoredTransactionResponse = {
  mailAccountPda: string;
  transaction: {
    [key: string]: number;
  };
  userWallet: string;
  masterWallet: string;
  message: string;
};

type Response = {
  data: SponsoredTransactionResponse;
  type: string;
  success: boolean;
};
export const useWalletSignerApi = () => {
  const { fetch } = useHttp();
  const { address } = usePrivyWallet();
  const { signTransaction } = useSignTransaction();
  const connection = useSolanaConnection();
  const { showToast } = useToast();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_GET_SIGNER_MESSAGE],
    mutationFn: async () => {
      const payload = {
        event: "create_transaction",
        source: "nodejs_signer",
        userWallet: address,
      };
      const { data } = await fetch<Response>(
        "/create-mail-box",
        "POST",
        payload
      );

      if (data && data.data && data.data.transaction) {
        const obj = data?.data?.transaction;

        if (!obj || typeof obj !== "object") {
          throw new Error("Invalid transaction format");
        }

        const keys = Object.keys(obj)
          .map(Number)
          .sort((a, b) => a - b);
        const bytes = Uint8Array.from(keys.map((key) => obj[key]));

        const tx = VersionedTransaction.deserialize(bytes);
        const signedTransaction = await signTransaction({
          transaction: tx,
          connection: connection,
          uiOptions: {
            showWalletUIs: !1,
          },
        });

        const serializedSignedTransaction = signedTransaction.serialize();

        const transactionObject: any = {};
        serializedSignedTransaction.forEach((byte, index) => {
          transactionObject[index] = byte;
        });

        const executionPayload = {
          event: "execute_transaction",
          source: "nodejs_signer",
          signedTransaction: transactionObject,
          mailAccountPda: data.data.mailAccountPda,
          userWallet: address,
        };

        await fetch("/create-mail-box", "POST", executionPayload);
        return !0;
      }
    },
    onError: () => {
      showToast("Failed to create mailbox", {
        type: "error",
      });
    },
    onSuccess: () => {
      showToast("Mailbox created successfully", {
        type: "success",
      });
    },
  });
};
