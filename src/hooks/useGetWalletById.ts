import { useSolanaWallets } from "@privy-io/react-auth";
import { useCallback, useMemo } from "react";

export const useGetWalletById = (id?: string) => {
  const { wallets } = useSolanaWallets();
  const get = useCallback(
    (id: string, walletClientType?: string) => {
      const _wallet = wallets.find(
        (wallet) => wallet.address?.toString() === id
      );

      if (!_wallet) {
        return wallets.find((w) => w.walletClientType === walletClientType);
      } else {
        return _wallet;
      }
    },
    [wallets]
  );
  const selectedWallet = useMemo(() => {
    if (!id) {
      return null;
    }
    return get(id);
  }, [get, id]);
  return { selectedWallet, get };
};
