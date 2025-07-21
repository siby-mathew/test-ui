import { WebIrys } from "@irys/sdk";
import Query from "@irys/query";

import { usePrivyWallet } from "./usePrivyWallet";
import { Transaction } from "@solana/web3.js";
import { useSignMessage } from "@privy-io/react-auth/solana";

import { useSendTransaction } from "@privy-io/react-auth/solana";
import { useSolanaConnection } from "./useConnection";
import { useGetMailProgramInstance } from "./useMailProgramInstance";

export const useWebIrys = () => {
  const { wallet } = usePrivyWallet();
  const { provider } = useGetMailProgramInstance();
  const { signMessage } = useSignMessage();
  const { sendTransaction } = useSendTransaction();
  const rpcUrl = import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT;

  const irysQuery = new Query({
    network: "devnet",
  });
  const connection = useSolanaConnection();

  const getWebIrys = async () => {
    if (wallet?.address && provider) {
      const walletIrys = {
        rpcUrl: rpcUrl,
        name: "solmail",
        provider: {
          sendTransaction: async (transaction: Transaction) => {
            return sendTransaction({
              transaction: transaction,
              connection: connection,
            });
          },
          publicKey: provider.wallet.publicKey,
          signMessage: async (message: Uint8Array) => {
            const signature = await signMessage({ message });
            return Buffer.from(signature);
          },
          signTransaction: async (tx: Transaction) =>
            await provider.wallet.signTransaction(tx),
          signAllTransactions: async (txs: Array<Transaction>) =>
            await provider.wallet.signAllTransactions(txs),
        },
      };
      const config = {
        network: "devnet",
        token: "solana",
        wallet: walletIrys,
      };
      const webIrysInstance = new WebIrys(config);

      await webIrysInstance.ready();
      return webIrysInstance;
    }
  };

  return {
    getWebIrys,
    irysQuery,
  };
};
export default useWebIrys;
