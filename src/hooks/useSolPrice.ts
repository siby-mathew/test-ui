import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryKeys } from "src/types";

const fetchSOLPrice = async (): Promise<any> => {
  const { data } = await axios.get<any>(
    `${import.meta.env.VITE_SOLMAIL_PRICE_API}simple/price?ids=solana&vs_currencies=usd`
  );
  if (data && data.solana && data.solana.usd) {
    return data.solana.usd;
  }

  return 0;
};

export function useSOLPrice() {
  return useQuery<number>({
    queryKey: [QueryKeys.SOL_PRICE],
    queryFn: fetchSOLPrice,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}
