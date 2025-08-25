import { RPC_ENDPOINT } from "@const/config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { QueryKeys } from "src/types";

type PayLoad = {
  method:
    | "getTokenAccounts"
    | "getAsset"
    | "getSignaturesForAddress"
    | "getTransaction"
    | "getAssetBatch";

  params: any;
};
export const useHeliusApi = <T>(
  { method, params }: PayLoad,
  queryOptions?: Partial<UseQueryOptions<T>>
) => {
  return useQuery({
    queryKey: [QueryKeys.HELIUS_GNERIC, method, params],
    staleTime: 60 * 1000,
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          RPC_ENDPOINT,
          {
            jsonrpc: "2.0",
            id: "1",
            method: method,
            params: params,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return (data?.result as T) || ({} as T);
      } catch {
        return {} as T;
      }
    },
    ...queryOptions,
  });
};
