import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, type Idl } from "@project-serum/anchor";

import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";

import { useMemo } from "react";

import { useSolanaConnection } from "./useConnection";

export const useGetProgramInstance = <T extends Idl>(
  IDL: T,
  programAddress: string
) => {
  const { wallets } = useSolanaWallets();
  const { authenticated } = usePrivy();
  const connection = useSolanaConnection();
  return useMemo(() => {
    const wallet = wallets[0] ?? undefined;
    if (!authenticated || !wallets.length || !wallet) {
      return {
        provider: null,
        program: null,
        mailAccountAddress: null,
      };
    }
    const provider = new AnchorProvider(
      connection,
      {
        publicKey: new PublicKey(wallet.address),
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      },
      { commitment: "processed" }
    );
    const programID = new PublicKey(programAddress);
    const [mailAccountAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("mail-accountv2"), new PublicKey(wallet.address).toBuffer()],
      programID
    );

    const program = new Program<T>(IDL as T, programID, provider);

    return {
      provider,
      program,
      mailAccountAddress,
    };
  }, [IDL, authenticated, connection, programAddress, wallets]);
};
