import { getToken } from "@utils/string/token";
import { atom } from "jotai";

export type AuthType = {
  isSignInRequested: boolean;
  isAuthenticated: boolean;
};

export const AuthState = atom<AuthType>({
  isSignInRequested: !1,
  isAuthenticated: !!getToken(),
});
