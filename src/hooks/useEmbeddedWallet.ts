import { useSolanaWallets as usePrivySolanaWallets } from "@privy-io/react-auth";

export const useEmbeddedWallet = () => {
  const { wallets } = usePrivySolanaWallets();
  return wallets.find((wallet) => wallet.walletClientType === "privy");
};

export const useSolanaWallets = () => {
  const { wallets, ...other } = usePrivySolanaWallets();
  const sortedWallets = wallets.sort((a, b) => {
    if (a.walletClientType === "privy" && b.walletClientType !== "privy")
      return -1;
    if (a.walletClientType !== "privy" && b.walletClientType === "privy")
      return 1;
    return 0;
  });
  return {
    ...other,
    wallets: sortedWallets,
  };
};
