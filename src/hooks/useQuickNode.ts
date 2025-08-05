import { useMutation } from "@tanstack/react-query";
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
  | "sns_getDomainRecordV2Key";

type QuickNodePayload = {
  method: SnsMethod;
  params: string[];
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
