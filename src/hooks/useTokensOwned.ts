import { usePrivyWallet } from "./usePrivyWallet";
import { useHeliusApi } from "./useHeliusApi";

import {
  FormattedToken,
  TokenAccount,
  TokenAccountsResponse,
  TokenResult,
} from "src/types/token";
import { useMemo } from "react";
import { useBalance } from "./useBalance";
import { BASE_TOKEN } from "@const/tokens";
import { useHeliusAssetsBatch } from "./useHeliusAssetsBatch";
import { useJupiterPrice } from "./useJupiterPrice";
import { Price } from "src/types/asset";

export type FormattedTokens = TokenAccount &
  Partial<{
    description?: string;
    name: string;
    symbol: string;
    token_standard: "Fungible" | "NonFungible" | string;
  }> & {
    decimals: number;
    icon: string;
    price: Price | undefined;
  };

export const useTokensOwned = () => {
  const { data: solBalance } = useBalance();
  const { address } = usePrivyWallet();
  const { data, isLoading, isFetching } = useHeliusApi<TokenAccountsResponse>(
    {
      params: {
        owner: address,
        options: { showZeroBalance: true },
      },
      method: "getTokenAccounts",
    },
    {
      staleTime: 60 * 1000,
    }
  );

  const tokens = useMemo(() => {
    const arr = [{ ...BASE_TOKEN, amount: solBalance ?? 0 }];
    if (!data || !data.token_accounts || !data.token_accounts.length) {
      return arr;
    }
    return arr
      .concat([...data.token_accounts])
      .filter((token) => !token.frozen);
  }, [data, solBalance]);

  const mint = useMemo(() => tokens.map((token) => token.mint), [tokens]);

  const { data: tokenWithMeta, isLoading: isMetaLoading } =
    useHeliusAssetsBatch(mint);

  const { data: priceData, isLoading: isPriceLoading } = useJupiterPrice(mint);

  const formattedTokens: FormattedTokens[] = useMemo(() => {
    if (!tokenWithMeta || !tokenWithMeta.length) {
      return [];
    }
    const formatted = tokenWithMeta
      .map(({ id, content, token_info }) => {
        const obj = tokens.find((item) => item.mint === id);
        if (!obj) return !1;
        return {
          ...obj,
          ...(content?.metadata ?? {}),
          decimals: token_info?.decimals ?? 9,
          icon: content?.links?.image ?? "",
          price: priceData && priceData[id] ? priceData[id] : undefined,
        };
      })
      .filter((item) => !!item);

    return formatted;
  }, [priceData, tokenWithMeta, tokens]);

  const isPending = useMemo(
    () => isLoading || isMetaLoading || isPriceLoading,
    [isLoading, isMetaLoading, isPriceLoading]
  );

  return {
    formattedTokens,
    tokens,
    isLoading: isPending,
    isFetching,
    address,
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
