import { useQuery } from "@tanstack/react-query";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { QueryKeys } from "src/types";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { formatSolBalance } from "@utils/formating";

/**
 * useBalance hook
 * @param tokenMint optional token mint address; if not provided, fetches native SOL
 */
export const useBalance = (tokenMint?: string) => {
  const { wallet } = usePrivyWallet();
  const connection = useSolanaConnection();

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

        const mint = new PublicKey(tokenMint);
        const ata = await getAssociatedTokenAddress(mint, owner);

        const tokenAccount = await connection.getTokenAccountBalance(ata);
        return parseFloat(tokenAccount.value.amount);
      },
      enabled,
      refetchOnWindowFocus: true,
    });

  return {
    data,
    isFetching,
    refetch,
    isRefetching,
    isLoading,
    isFetched,
    // format based on SOL (lamports) or token (raw units); you can improve this logic
    formattedBalance: formatSolBalance(data ?? 0),
  };
};
