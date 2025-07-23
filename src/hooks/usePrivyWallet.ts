import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useEmbeddedWallet } from "./useEmbeddedWallet";

export const usePrivyWallet = () => {
  const { ready, authenticated, login, logout, signMessage, user } = usePrivy();
  const { exportWallet } = useSolanaWallets();
  const wallet = useEmbeddedWallet();
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
