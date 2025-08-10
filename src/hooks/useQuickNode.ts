import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryKeys } from "src/types";

export type SnsMethod =
  | "sns_getAllDomainsForOwner"
  | "sns_getDomainKey"
  | "sns_getDomainData"
  | "sns_getDomainRecordKey"
  | "sns_getRegistrationTransaction"
  | "sns_getDomainReverseKey"
  | "sns_getSubdomains"
  | "sns_reverseLookup"
  | "sns_getSupportedRecords"
  | "sns_resolveDomain"
  | "sns_getFavouriteDomain"
  | "sns_getDomainDataV2"
  | "sns_getDomainRecordV2Key"
  | "getTokenAccountsByOwner";

type QuickNodePayload = {
  method: SnsMethod;
  params: any[];
};

export const useQuickNode = () =>
  useMutation({
    mutationKey: [QueryKeys.QUICKNODE],
    mutationFn: async ({ method, params }: QuickNodePayload) => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_QUICKNODE_BASE_URL,
          {
            jsonrpc: "2.0",
            id: 1,
            method,
            params,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        return data.result;
      } catch {
        return null;
      }
    },
  });

export const useQuickNodeQuery = ({ method, params }: QuickNodePayload) => {
  const { mutateAsync } = useQuickNode();
  return useQuery({
    queryKey: [QueryKeys.QUICK_NODE_QUERY, method, params],
    queryFn: () =>
      mutateAsync({
        method,
        params,
      }),
  });
};
