import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { usePrivyWallet } from "./usePrivyWallet";
import axios from "axios";
import { HELIUS_API_ENDPOINT } from "@const/config";

const fetchTransactions = async (address: string) => {
  try {
    const { data } = await axios.get(
      `${HELIUS_API_ENDPOINT}addresses/${address}/transactions?api-key=${import.meta.env.VITE_SOLMAIL_RPC_API_KEY}&type=TRANSFER`
    );
    return data;
  } catch {
    return [];
  }
};
export const useGetTransactions = () => {
  const { address } = usePrivyWallet();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.TRANSACTION_INFO],
    queryFn: () => fetchTransactions(address),
    enabled: !!address,
  });
  return {
    data,
    isLoading,
  };
};
