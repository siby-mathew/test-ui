import { SolanaTransactionSignatureInfo } from "src/types/token";
import { useHeliusApi } from "./useHeliusApi";

import { useTokensOwned } from "./useTokensOwned";
import { useMemo } from "react";

export const useGetTransactions = () => {
  const { data } = useTokensOwned();

  const addresses = useMemo(() => {
    if (!data || !data?.token_accounts || !data?.token_accounts.length)
      return [];

    return data?.token_accounts?.map((item) => item.address);
  }, [data]);

  return useHeliusApi<SolanaTransactionSignatureInfo[]>({
    method: "getSignaturesForAddress",
    params: [
      ...addresses,
      {
        limit: 10,
      },
    ],
  });
};
