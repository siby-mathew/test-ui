import { useWallets } from "@privy-io/react-auth";
import { useCallback, useMemo } from "react";

export const useGetWalletById = (id?: string) => {
  const { wallets } = useWallets();
  const get = useCallback(
    (id: string) => {
      const _wallet = wallets.find(
        (wallet) => wallet.address?.toString() === id
      );
      return _wallet;
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
