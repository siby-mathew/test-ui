import { useMemo } from "react";
import { useTokensOwned } from "./useTokensOwned";
import { fromRawAmount } from "@utils/formating";
import { BASE_TOKEN } from "@const/tokens";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "src/types";

export const usePortfolioValue = () => {
  const { formattedTokens, isLoading } = useTokensOwned();
  const quercClient = useQueryClient();
  const solana = useMemo(() => {
    return formattedTokens.find(({ mint }) => BASE_TOKEN.mint === mint);
  }, [formattedTokens]);
  const usd = useMemo(() => {
    if (!formattedTokens || !formattedTokens.length) {
      return 0;
    }

    let totalUsd = 0;
    formattedTokens.forEach(({ amount, price, decimals }) => {
      if (!price || !price.usdPrice) {
        return;
      }

      const amt =
        (fromRawAmount(amount, decimals).toNumber() ?? 0) *
        (price.usdPrice ?? 0);

      totalUsd += amt ?? 0;
    });

    return totalUsd;
  }, [formattedTokens]);

  const refetch = () => {
    quercClient.invalidateQueries({ queryKey: [QueryKeys.JUPITER_PRICE] });
  };
  return {
    usd,
    isLoading,
    solana,
    refetch,
  };
};
