import { SolanaTransactionSignatureInfo } from "src/types/token";
import { useHeliusApi } from "./useHeliusApi";
import { usePrivyWallet } from "./usePrivyWallet";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import axios from "axios";

const getTransaction = async (signature: string) => {
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT,
      {
        jsonrpc: "2.0",
        id: "1",
        method: "getTransaction",
        params: [signature, { encoding: "json" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data?.result;
  } catch {
    return {};
  }
};

type TxCategory = "incoming" | "outgoing" | "swap" | "stake" | "other";

const categorizeTransaction = (tx: any, myAddress: string): TxCategory => {
  if (tx?.meta?.err) return "other"; // failed or unknown

  const pre = tx?.meta?.preBalances || [];
  const post = tx?.meta?.postBalances || [];
  const preTokens = tx?.meta?.preTokenBalances || [];
  const postTokens = tx?.meta?.postTokenBalances || [];

  const solChange = (post[0] || 0) - (pre[0] || 0);

  if (solChange > 0) return "incoming";
  if (solChange < 0) return "outgoing";

  const tokenChange = postTokens.some((pt) => pt.owner === myAddress);
  if (tokenChange) {
    return preTokens.some((pt: any) => pt.owner === myAddress)
      ? "swap"
      : "incoming";
  }

  return "other";
};

const fetchTransactionDetails = async (
  signatures: string[],
  myAddress: string
) => {
  try {
    const txs = await Promise.all(signatures.map((sig) => getTransaction(sig)));
    return txs?.map((tx) => ({
      signature: tx?.transaction?.signatures?.[0],
      category: categorizeTransaction(tx, myAddress),
    }));
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const useGetTransactions = () => {
  const { address } = usePrivyWallet();

  const { data } = useHeliusApi<SolanaTransactionSignatureInfo[]>({
    method: "getSignaturesForAddress",
    params: [
      address,
      {
        limit: 100,
      },
    ],
  });

  const signatures = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }
    return data.map((transaction) => transaction.signature);
  }, [data]);

  const { data: transactions } = useQuery({
    queryKey: [QueryKeys.TRANSACTION_INFO, signatures.length],
    enabled: !!signatures.length,
    queryFn: () =>
      fetchTransactionDetails(
        signatures,
        "8TXo72xqr8tQShnBzhnDUdFracmKgrFKEx7WLApSRtqB"
      ),
  });

  console.log(transactions);
  return {
    data,
  };
};
