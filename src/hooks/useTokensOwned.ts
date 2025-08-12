import { usePrivyWallet } from "./usePrivyWallet";
import { useHeliusApi } from "./useHeliusApi";

import {
  FormattedToken,
  TokenAccountsResponse,
  TokenResult,
} from "src/types/token";
import { useMemo } from "react";
import { useBalance } from "./useBalance";
import { BASE_TOKEN } from "@const/tokens";

export const useTokensOwned = () => {
  const { data: solBalance } = useBalance();
  const { address } = usePrivyWallet();
  const { data, isLoading, isFetching } = useHeliusApi<TokenAccountsResponse>({
    params: {
      owner: address,
      options: { showZeroBalance: true },
    },
    method: "getTokenAccounts",
  });

  const tokens = useMemo(() => {
    const arr = [{ ...BASE_TOKEN, amount: solBalance ?? 0 }];
    if (!data || !data.token_accounts || !data.token_accounts.length) {
      return arr;
    }
    return arr.concat([...data.token_accounts]);
  }, [data, solBalance]);

  return {
    tokens,
    isLoading,
    isFetching,
  };
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

export const useGetTokenById = (id: string | undefined) => {
  const { tokens } = useTokensOwned();
  const token = useMemo(() => {
    if (!tokens || !tokens.length) {
      return null;
    }
    return tokens.find((item) => item.mint === id);
  }, [id, tokens]);
  return token;
};
