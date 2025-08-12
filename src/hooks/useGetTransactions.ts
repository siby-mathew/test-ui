import { SolanaTransactionSignatureInfo } from "src/types/token";
import { useHeliusApi } from "./useHeliusApi";
import { usePrivyWallet } from "./usePrivyWallet";

export const useGetTransactions = () => {
  const { address } = usePrivyWallet();

  return useHeliusApi<SolanaTransactionSignatureInfo[]>({
    method: "getSignaturesForAddress",
    params: [
      address,
      {
        limit: 10,
      },
    ],
  });
};
