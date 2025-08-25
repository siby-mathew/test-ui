import { BASE_TOKEN } from "@const/tokens";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { PriceResponse } from "src/types/asset";

export const useJupiterPrice = (
  ids: string[]
): UseQueryResult<PriceResponse, Error> => {
  return useQuery<PriceResponse, Error>({
    queryKey: [QueryKeys.JUPITER_PRICE, ids],
    enabled: !!ids && ids.length > 0,
    queryFn: async () => {
      const query = new URLSearchParams({
        ids: [BASE_TOKEN.mint, ...ids].join(","),
      }).toString();
      const res = await fetch(
        `${import.meta.env.VITE_SOLMAIL_JUPITER_PRICE_API}?${query}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching prices: ${res.statusText}`);
      }
      return res.json() as Promise<PriceResponse>;
    },
    refetchInterval: 30 * 1000,
  });
};
