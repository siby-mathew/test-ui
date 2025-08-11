import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryKeys } from "src/types";

type PayLoad = {
  method: "getTokenAccounts" | "getAsset";
  params: any;
};
export const useHeliusApi = <T>({ method, params }: PayLoad) => {
  return useQuery({
    queryKey: [QueryKeys.TOKENS, method, params],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT,
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
  });
};
