import {
  createTransfer,
  findReference,
  parseURL,
  validateTransfer,
  type TransferRequestURL,
} from "@solana/pay";

import { useCallback, useEffect, useTransition } from "react";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { useSolanaConnection } from "./useConnection";
import { usePrivyWallet } from "./usePrivyWallet";
import { useToast } from "./useToast";
import type { PublicKey } from "@solana/web3.js";
import { isFunction } from "lodash";

import type { StatusType } from "src/types";

type Options = {
  ref: PublicKey | null;
  qrUrl: URL | null;
  onSuccess?: () => void;
  onError?: (e: Error) => void;
  onPaymentStatusUpdate?: (s: StatusType) => void;
};
const _ERROR = "Failed to transfer amount";
export const useSolanaPay = ({
  ref,
  qrUrl,
  onSuccess,
  onError,
  onPaymentStatusUpdate,
}: Options) => {
  const { provider } = useGetMailProgramInstance();
  const { isConnected: connected, wallet } = usePrivyWallet();
  const [isPending, startTransition] = useTransition();

  const connection = useSolanaConnection();
  const { showToast } = useToast();
  const sendTransaction = useCallback(async () => {
    if (
      isPending ||
      !qrUrl ||
      !provider ||
      !wallet ||
      !connection ||
      !connected
    ) {
      return !0;
    }
    const { recipient, amount, reference, splToken } = parseURL(
      qrUrl
    ) as TransferRequestURL;

    if (!amount) return;
    startTransition(async () => {
      try {
        const transaction = await createTransfer(
          connection,
          provider.publicKey,
          {
            recipient,
            amount,
            splToken,
            reference,
          },
          { commitment: "confirmed" }
        );
        if (!wallet?.sendTransaction) {
          return;
        }
        await wallet.sendTransaction(transaction, connection, {
          skipPreflight: true,
        });
        showToast("Successfully transfered", {
          type: "success",
        });
        if (isFunction(onSuccess)) {
          onSuccess();
        }
        if (isFunction(onPaymentStatusUpdate)) {
          onPaymentStatusUpdate({
            isDone: !0,
            isChecking: !1,
          });
        }
      } catch (E) {
        if (isFunction(onPaymentStatusUpdate)) {
          onPaymentStatusUpdate({
            isDone: !1,
            isChecking: !1,
          });
        }

        showToast(_ERROR, {
          type: "error",
        });
        if (isFunction(onError)) {
          onError(E && E instanceof Error ? E : new Error(_ERROR));
        }
      }
    });
  }, [
    connected,
    connection,
    isPending,
    onError,
    onPaymentStatusUpdate,
    onSuccess,
    provider,
    qrUrl,
    showToast,
    wallet,
  ]);

  const checkPaymentStatus = useCallback(
    async (callback: (s: boolean) => void) => {
      try {
        if (!qrUrl) return !1;
        const { recipient, amount, reference } = parseURL(
          qrUrl
        ) as TransferRequestURL;
        if (!amount || !ref) return;

        const signatureInfo = await findReference(connection, ref, {
          finality: "confirmed",
        });

        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient: recipient,
            amount,
            reference,
          },
          { commitment: "confirmed" }
        );

        if (isFunction(onPaymentStatusUpdate)) {
          onPaymentStatusUpdate({
            isDone: !0,
            isChecking: !1,
          });
        }
        callback(!0);
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      } catch (e) {
        if (isFunction(onPaymentStatusUpdate)) {
          onPaymentStatusUpdate({
            isDone: !1,
            isChecking: !1,
          });
        }
        callback(!1);
        if (isFunction(onError)) {
          onError(e && e instanceof Error ? e : new Error(_ERROR));
        }
      }
    },
    [connection, onError, onPaymentStatusUpdate, onSuccess, qrUrl, ref]
  );
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (ref) {
      checkPaymentStatus((s) => {
        if (s) {
          return;
        }
        timer = setInterval(
          () =>
            checkPaymentStatus((status) => {
              if (status && timer) {
                clearInterval(timer);
              }
            }),
          3000
        );
      });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [checkPaymentStatus, ref]);

  return {
    sendTransaction,
    isPending,
  };
};
