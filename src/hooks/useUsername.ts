import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { DOMAINS } from "@const/domain";
import { useToast } from "./useToast";

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
  const { showToast } = useToast();
  const onFail = () => {
    showToast("Failed to create username", { type: "error" });
  };
  return useMutation({
    mutationKey: [QueryKeys.USERNAME_STATUS],
    mutationFn: async ({ username }: { username: string }) => {
      if (!program || !provider?.publicKey) return false;

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

          await program.methods
            .createUsername(username)
            .accounts({
              usernameAccount: usernameAccountPDA,
              rateLimit: rateLimitPDA,
              marketplaceSettings: null,
              bidAccountCheck: null,
              authority: provider.publicKey,
              systemProgram: SystemProgram.programId,
            } as any)
            .rpc();

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
      if (res) {
        showToast("Username created", { type: "success" });
      } else {
        onFail();
      }
    },
  });
};
