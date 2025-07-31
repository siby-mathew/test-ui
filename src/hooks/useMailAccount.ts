import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import type { Solmail } from "@integrations/idl/solmail/solmail";
import { QueryKeys } from "src/types";
import { useToast } from "./useToast";

const fetchAccount = async (program: Program<Solmail>, address: PublicKey) => {
  try {
    const account = await program.account.solMailAccountV2.fetch(address);
    if (account) {
      return !0;
    }
    return !1;
  } catch {
    return !1;
  }
};
export const useMailAccount = () => {
  const { program, mailAccountAddress, provider } = useGetMailProgramInstance();
  const { data, isLoading, refetch, isRefetching, isFetched } = useQuery({
    queryKey: [QueryKeys.MAILBOX_STATUS],
    queryFn:
      provider && provider.publicKey
        ? () => fetchAccount(program, mailAccountAddress)
        : skipToken,
    enabled: !!(provider && provider.publicKey),
  });
  return {
    hasAccount: data,
    isLoading,
    refetch,
    isRefetching,
    isFetched,
  };
};

export const useCreateMailbox = () => {
  const { showToast } = useToast();
  const { program, provider } = useGetMailProgramInstance();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_MAILBOX],
    mutationFn: async () => {
      try {
        if (!program || !provider) {
          return;
        }
        const res = await program.methods
          .registerV2(provider.publicKey?.toString() ?? "")
          .accounts({
            authority: provider.publicKey,
          })
          .rpc();
        if (res) {
          return !0;
        }
        throw "";
      } catch {
        throw "";
      }
    },
    onError: () => {
      showToast("Failed to create mailbox", {
        type: "error",
      });
    },
    onSuccess: () => {
      showToast("Mailbox created", {
        type: "success",
      });
    },
  });
};
