import { usePrivyWallet } from "@hooks/usePrivyWallet";
import bs58 from "bs58";
import apiConfig, { type AxiosResponse } from "@utils/api";
import { useDisclosure } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { useSignMessage } from "@privy-io/react-auth/solana";
import { useEffect, useTransition } from "react";
import { useAuthStatus } from "@hooks/useAuthState";
const STORAGE_NAME = "auth:token";

export const useSigner = () => {
  const { wallet } = usePrivyWallet();
  const {
    isSignInRequested,
    update,
    isAuthenticated: authState,
  } = useAuthStatus();
  const [isPending, start] = useTransition();
  const { signMessage } = useSignMessage();
  const getToken = (): string | boolean => {
    const val = localStorage.getItem(STORAGE_NAME);
    return val && val.trim() ? val.trim() : !1;
  };
  const { isOpen: isAuthenticated, onOpen } = useDisclosure({
    defaultIsOpen: !!getToken(),
  });

  const setToken = (token: string) => {
    if (token) {
      localStorage.setItem(STORAGE_NAME, token);
    }
  };
  const getNonce = async () => {
    try {
      const { data }: AxiosResponse<{ gmtValue: string; nonce: string }> =
        await apiConfig<{ gmtValue: string; nonce: string }>(
          "/wallet-auth",
          "POST",
          undefined,
          undefined,
          false,
          "generate-nonce",
          true
        );

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const generateToken = async (nonce: string, gmtValue: string) => {
    try {
      if (!wallet || !wallet?.address) return false;
      const signature = await getSignature(nonce);

      if (!signature) return false;
      const publicKey = new PublicKey(wallet.address).toBase58();
      const { data }: AxiosResponse<{ authToken: string }> = await apiConfig<{
        authToken: string;
      }>(
        "wallet-auth",
        "POST",
        {
          nonce,
          signature,
          publicKey,
          ...(gmtValue && { gmtValue }),
        },
        undefined,
        false,
        "generate-jwt",
        true
      );
      if (data.authToken) {
        setToken(data.authToken);
        onOpen();

        return true;
      }
    } catch {
      return false;
    }
  };

  const getSignature = async (nonce: string) => {
    if (!wallet || !wallet.signMessage) {
      return;
    }
    const message = `Sign in with SolMail.\n\nNo password is required.\n\nClick "Sign" or "Approve" only means you have confirmed you own this wallet.\n\nThis request will not initiate any blockchain transaction or cost any gas fee.\n\nNonce: ${nonce}`;
    const messageBytes = new TextEncoder().encode(message);
    const signature = await signMessage({ message: messageBytes });
    return bs58.encode(signature);
  };
  const requestSignIn = async () => {
    if (isPending || isSignInRequested) return;
    start(async () => {
      if (!getToken() && !isAuthenticated) {
        update({
          isSignInRequested: !0,
        });
        const nonce = await getNonce();
        if (!nonce?.nonce) {
          onOpen();
          return;
        }
        const auth = await generateToken(nonce.nonce, nonce.gmtValue);
        if (auth) {
          onOpen();
          return;
        }
      }
    });
  };

  const clearToken = () => {
    localStorage.removeItem(STORAGE_NAME);
  };

  useEffect(() => {
    if (authState !== isAuthenticated) {
      update({
        isAuthenticated,
      });
    }
  }, [authState, isAuthenticated, update]);

  return {
    getToken,
    clearToken,
    setToken,
    requestSignIn,
    isAuthenticated,
    isAuthenticating: isPending,
  };
};
