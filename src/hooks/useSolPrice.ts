import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryKeys } from "src/types";

export interface SolPriceResponse {
  symbol: string;
  mins: number;
  price: string;
  closeTime: number;
}

const fetchSOLPrice = async (): Promise<SolPriceResponse> => {
  const { data } = await axios.get<SolPriceResponse>(
    `${import.meta.env.VITE_SOLMAIL_PRICE_API}?symbol=SOLUSDT`
  );
  return data;
};

export function useSOLPrice() {
  return useQuery<SolPriceResponse>({
    queryKey: [QueryKeys.SOL_PRICE],
    queryFn: fetchSOLPrice,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });
}
