import { useQuery } from "@tanstack/react-query";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { QueryKeys } from "src/types";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { formatTokenBalance, toRawAmount } from "@utils/formating";
import { useToken } from "./useToken";
import { useMemo } from "react";
import BigNumber from "bignumber.js";

/**
 * useBalance hook
 * @param tokenMint optional token mint address; if not provided, fetches native SOL
 */
export const useBalance = (
  tokenMint?: string,
  requestedAmount?: string | number
) => {
  const { wallet } = usePrivyWallet();
  const connection = useSolanaConnection();
  const { symbol, decimals } = useToken(tokenMint);

  const enabled = !!wallet?.address;

  const { data, isFetching, refetch, isRefetching, isFetched, isLoading } =
    useQuery({
      queryKey: [QueryKeys.SOL_BALANCE, wallet?.address, tokenMint],
      queryFn: async () => {
        if (!wallet?.address) throw new Error("Wallet not connected");

        const owner = new PublicKey(wallet.address);

        if (!tokenMint) {
          return connection.getBalance(owner);
        }
        try {
          const mint = new PublicKey(tokenMint);
          const ata = await getAssociatedTokenAddress(mint, owner);
          const tokenAccount = await connection.getTokenAccountBalance(ata);
          return parseFloat(tokenAccount.value.amount);
        } catch {
          return 0;
        }
      },
      enabled,
      refetchOnWindowFocus: true,
    });

  const hasEnoughBalance = useMemo(() => {
    if (!requestedAmount || !data) return !0;
    const amount = toRawAmount(requestedAmount, decimals);
    const balance = new BigNumber(data);
    return balance.gt(amount);
  }, [data, decimals, requestedAmount]);

  return {
    data,
    hasEnoughBalance,
    isFetching,
    refetch,
    isRefetching,
    isLoading,
    isFetched,

    formattedBalance: formatTokenBalance(data ?? 0, decimals, symbol),
  };
};
