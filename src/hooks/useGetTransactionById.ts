import { useHeliusApi } from "./useHeliusApi";

export const useGetTransactionById = (signature: string) => {
  return useHeliusApi({
    method: "getTransaction",
    params: [signature],
  });
};
