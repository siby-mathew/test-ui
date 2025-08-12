import { usePrivyWallet } from "./usePrivyWallet";
import { useGetLinkedUsernameById } from "./useUsernames";

export const useMyUsername = () => {
  const { wallet } = usePrivyWallet();
  return useGetLinkedUsernameById(wallet?.address);
};
