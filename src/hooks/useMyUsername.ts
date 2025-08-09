import { usePrivyWallet } from "./usePrivyWallet";
import { useUsernameById } from "./useUsernames";

export const useMyUsername = () => {
  const { wallet } = usePrivyWallet();
  return useUsernameById(wallet?.address);
};
