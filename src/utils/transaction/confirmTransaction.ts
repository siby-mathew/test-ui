import type { Idl, IdlEvents, Program } from "@coral-xyz/anchor";
import {
  Connection,
  type TransactionSignature,
  type SignatureResult,
} from "@solana/web3.js";

const DEFAULT_TIMEOUT = 31000;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Waits for confirmation of a transaction via both WebSocket and REST polling.
 * Falls back to polling if WebSocket fails.
 */
export const awaitTransactionSignatureConfirmation = async (
  txid: TransactionSignature,
  connection: Connection,
  timeout = DEFAULT_TIMEOUT
): Promise<SignatureResult> => {
  let done = false;

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        console.warn("Timeout for txid:", txid);
        reject({ timeout: true });
      }
    }, timeout);

    try {
      connection.onSignature(
        txid,
        (result) => {
          if (done) return;
          done = true;
          clearTimeout(timer);

          if (result.err) {
            reject(result.err);
          } else {
            resolve(result);
          }
        },
        connection.commitment
      );
    } catch (wsError) {
      console.error("WebSocket setup error:", txid, wsError);
    }

    // Fallback: Poll every 3s
    while (!done) {
      try {
        const { value } = await connection.getSignatureStatuses([txid]);
        const result = value[0];

        if (result) {
          if (result.err) {
            done = true;
            clearTimeout(timer);
            reject(result.err);
          } else if (
            result.confirmationStatus === "confirmed" ||
            result.confirmationStatus === "finalized"
          ) {
            done = true;
            clearTimeout(timer);
            resolve(result);
          }
        }
      } catch (pollError) {
        console.error("Polling error for txid:", txid, pollError);
      }

      await sleep(3000);
    }
  });
};

export const createEventAsyncIterable = <
  T extends Idl,
  K extends keyof IdlEvents<T>,
>(
  program: Program<T>,
  eventName: K,
  signal: AbortSignal
): AsyncIterable<IdlEvents<T>[K]> => {
  let resolveCurrent: (value: IdlEvents<T>[K]) => void;
  let rejectCurrent: (reason?: unknown) => void;
  const queue: IdlEvents<T>[K][] = [];
  let currentPromise: Promise<IdlEvents<T>[K]> | null = null;

  const handleEvent = (event: IdlEvents<T>[K]) => {
    if (resolveCurrent) {
      resolveCurrent(event);
      currentPromise = null;
    } else {
      queue.push(event);
    }
  };

  const handleError = (event: IdlEvents<T>["error"]) => {
    const error = new Error(`Event error: ${JSON.stringify(event)}`);
    if (rejectCurrent) {
      rejectCurrent(error);
      currentPromise = null;
    }
  };

  const listener = program.addEventListener(eventName as any, handleEvent);
  const errorListener = program.addEventListener("error", handleError);

  signal.addEventListener("abort", () => {
    if (listener) program.removeEventListener(listener);
    if (errorListener) program.removeEventListener(errorListener);
    if (rejectCurrent) rejectCurrent(new Error("Event listener aborted"));
  });

  const createPromise = () =>
    new Promise<IdlEvents<T>[K]>((resolve, reject) => {
      resolveCurrent = resolve;
      rejectCurrent = reject;
    });

  return {
    async *[Symbol.asyncIterator]() {
      try {
        while (!signal.aborted) {
          if (queue.length > 0) {
            yield queue.shift()!;
          } else {
            currentPromise = createPromise();
            yield await currentPromise;
          }
        }
      } finally {
        if (listener) program.removeEventListener(listener);
        if (errorListener) program.removeEventListener(errorListener);
      }
    },
  };
};
