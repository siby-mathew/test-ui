import { usePrivyWallet } from "./usePrivyWallet";
import { useHeliusApi } from "./useHeliusApi";

import {
  FormattedToken,
  TokenAccountsResponse,
  TokenResult,
} from "src/types/token";
import { useMemo } from "react";

export const useTokensOwned = () => {
  const { address } = usePrivyWallet();
  return useHeliusApi<TokenAccountsResponse>({
    params: {
      owner: address,
      options: { showZeroBalance: true },
    },
    method: "getTokenAccounts",
  });
};

export const useTokenMeta = (id: string | undefined) => {
  const { data, isLoading, isFetching } = useHeliusApi<TokenResult>({
    method: "getAsset",
    params: {
      id: id,
    },
  });

  const formatted = useMemo(() => {
    if (!data) return;
    return {
      name: data?.content?.metadata?.name ?? "",
      symbol: data?.content?.metadata?.symbol,
      logo: data?.content?.files[0]?.cdn_uri,
      decimals: data?.token_info?.decimals ?? 9,
    } as FormattedToken;
  }, [data]);
  return {
    data,
    isLoading,
    isFetching,
    token: formatted,
  };
};
