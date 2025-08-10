import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useEmbeddedWallet } from "./useEmbeddedWallet";

export const usePrivyWallet = () => {
  const { ready, authenticated, login, logout, signMessage, user } = usePrivy();
  const { exportWallet: _export } = useSolanaWallets();
  const wallet = useEmbeddedWallet();

  const exportWallet = () => {
    _export({
      address: wallet?.address ?? "",
    });
  };
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
