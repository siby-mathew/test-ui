import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";

export const usePrivyWallet = () => {
  const { ready, authenticated, login, logout, signMessage, user } = usePrivy();
  const { wallets, exportWallet } = useSolanaWallets();
  const wallet = wallets && wallets.length > 0 ? wallets[0] : undefined;
  return {
    isConnecting: !ready,
    isConnected: authenticated,
    login,
    logout,
    signMessage,
    ready,
    user,
    address: wallet?.address ?? "",
    wallet: wallet,
    exportWallet,
  };
};
