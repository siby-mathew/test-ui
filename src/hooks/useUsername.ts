import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { DOMAINS } from "@const/domain";
import { useToast } from "@hooks/useToast";
import { usePrivyWallet } from "./usePrivyWallet";
import { useGetLinkedUsernameById, useUsernameUpdater } from "./useUsernames";
import { useAtom } from "jotai";
import { appState } from "@state/index";

const getUsernamePDA = (username: string, programId: PublicKey) =>
  PublicKey.findProgramAddressSync(
    [
      Buffer.from("username"),
      Buffer.from(username.toLowerCase()),
      Buffer.from(DOMAINS.DEFAULT.slice(1)),
    ],
    programId
  );

export const useUsernameStatus = () => {
  const { program } = useGetMailProgramInstance();
  return useMutation({
    mutationKey: [QueryKeys.USERNAME_STATUS],
    mutationFn: async ({ username }: { username: string }) => {
      if (!program) return false;
      const [usernameAccountPDA] = getUsernamePDA(username, program.programId);
      try {
        const account =
          await program.account.usernameAccount.fetch(usernameAccountPDA);

        return account;
      } catch {
        return false;
      }
    },
  });
};

export const useClaimUserName = () => {
  const { program, provider } = useGetMailProgramInstance();
  const { address } = usePrivyWallet();
  const { account } = useGetLinkedUsernameById(address);
  const { showToast } = useToast();
  const { refetch } = useUsernameUpdater();

  const onFail = () => {
    showToast("Failed to create username", { type: "error" });
    refetch();
  };
  return useMutation({
    mutationKey: [QueryKeys.CLAIM_USERNAME],
    mutationFn: async ({ username }: { username: string }) => {
      if (!program || !provider?.publicKey || !provider.wallet) return false;

      const [usernameAccountPDA] = getUsernamePDA(username, program.programId);

      try {
        await program.account.usernameAccount.fetch(usernameAccountPDA);
        return false;
      } catch {
        try {
          const [rateLimitPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("rate_limit"), provider.publicKey.toBuffer()],
            program.programId
          );
          const [marketplaceSettingsPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("marketplace_settings")],
            program.programId
          );

          await program.methods
            .createUsernameTemprorary(username)
            .accounts({
              usernameAccount: usernameAccountPDA,
              rateLimit: rateLimitPDA,
              marketplaceSettings: marketplaceSettingsPDA,
              authority: provider.publicKey,
              systemProgram: SystemProgram.programId,
            } as any)
            .rpc();
          // .createUsername(username)
          // .accounts({
          //   usernameAccount: usernameAccountPDA,
          //   rateLimit: rateLimitPDA,
          //   marketplaceSettings: marketplaceSettingsPDA,
          //   authority: provider.publicKey,
          //   systemProgram: SystemProgram.programId,
          // } as any)

          // .rpc();

          if (!account || !account.account) {
            const [mailAccountPDA] = PublicKey.findProgramAddressSync(
              [Buffer.from("mail-accountv2"), provider.publicKey.toBuffer()],
              program.programId
            );

            const mailAccount =
              await program.account.solMailAccountV2.fetch(mailAccountPDA);
            const mailboxToLink = mailAccount.mailbox;

            await program.methods
              .linkMailboxToUsername(mailboxToLink)
              .accounts({
                usernameAccount: usernameAccountPDA,
                mailAccountV2: mailAccountPDA,
                authority: provider.publicKey,
              })
              .rpc();
          }

          return true;
        } catch {
          return !1;
        }
      }
    },
    onError: () => {
      onFail();
    },
    onSuccess: (res) => {
      refetch();
      if (res) {
        showToast("Username created", { type: "success" });
      } else {
        onFail();
      }
    },
  });
};

export const useUnlinkUsername = () => {
  const { updateStatus } = useUsernameUpdateStatus();
  const { program, provider } = useGetMailProgramInstance();
  const { refetch } = useUsernameUpdater();
  const { showToast } = useToast();
  const mutation = useMutation({
    mutationKey: [QueryKeys.UNLINNK_USERNAME],
    mutationFn: async ({ usernameAccount }: { usernameAccount: PublicKey }) => {
      try {
        if (!provider || !program) {
          return;
        }
        const [mailAccountPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("mail-accountv2"), provider.publicKey.toBuffer()],
          program.programId
        );

        await program.methods
          .unlinkMailboxFromUsername()
          .accounts({
            usernameAccount,
            mailAccountV2: mailAccountPDA,
            authority: provider.wallet.publicKey,
          } as any)
          .rpc();
      } catch {
        return !0;
      }
    },
    onError: () => {
      updateStatus(!1);
      refetch();
      showToast("Failed to unlink mailbox", {
        type: "error",
      });
    },
    onMutate: () => {
      updateStatus(!0);
    },
    onSuccess: () => {
      updateStatus(!1);
      refetch();
      showToast("Mailbox unlinked successfully", {
        type: "success",
      });
    },
  });

  return mutation;
};

export const useUsernameUpdateStatus = () => {
  const [{ updatingUsername }, set] = useAtom(appState);

  const updateStatus = (status: boolean) => {
    set((prev) => ({
      ...prev,
      updatingUsername: status,
    }));
  };
  return {
    updatingUsername,
    updateStatus,
  };
};
export const useLinkUsername = () => {
  const { updateStatus } = useUsernameUpdateStatus();
  const { address } = usePrivyWallet();
  const { account } = useGetLinkedUsernameById(address);
  const { mutateAsync } = useUnlinkUsername();
  const { program, provider } = useGetMailProgramInstance();
  const { showToast } = useToast();
  const { refetch } = useUsernameUpdater();
  const mutation = useMutation({
    mutationKey: [QueryKeys.UNLINNK_USERNAME],
    mutationFn: async ({ usernameAccount }: { usernameAccount: PublicKey }) => {
      try {
        if (!provider || !program) {
          return;
        }
        const [mailAccountPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("mail-accountv2"), provider.publicKey.toBuffer()],
          program.programId
        );

        if (account && account.account) {
          await mutateAsync({
            usernameAccount: account.publicKey,
          });
        }

        const mailAccount =
          await program.account.solMailAccountV2.fetch(mailAccountPDA);
        const mailboxToLink = mailAccount.mailbox;

        await program.methods
          .linkMailboxToUsername(mailboxToLink)
          .accounts({
            usernameAccount: usernameAccount,
            mailAccountV2: mailAccountPDA,
            authority: provider.publicKey,
          })
          .rpc();
      } catch {
        return !0;
      }
    },
    onError: () => {
      updateStatus(!1);
      refetch();
      showToast("Failed to link mailbox", {
        type: "error",
      });
    },
    onMutate: () => {
      updateStatus(!0);
    },
    onSuccess: () => {
      updateStatus(!1);
      refetch();
      showToast("Mailbox linked successfully", {
        type: "success",
      });
    },
  });

  return mutation;
};
