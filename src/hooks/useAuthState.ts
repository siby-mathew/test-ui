import { AuthState, type AuthType } from "@state/auth";
import { useAtom } from "jotai";

export const useAuthStatus = () => {
  const [{ isAuthenticated, isSignInRequested }, set] = useAtom(AuthState);
  const update = (p: Partial<AuthType>) => {
    set((prev) => {
      return {
        ...prev,
        ...p,
      };
    });
  };

  return {
    isAuthenticated,
    isSignInRequested,
    update,
  };
};
