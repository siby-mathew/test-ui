import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { DOMAINS } from "@const/domain";
import { useToast } from "./useToast";

export const useUsernameStatus = () => {
  const { program } = useGetMailProgramInstance();
  return useMutation({
    mutationKey: [QueryKeys.USERNAME_STATUS],
    mutationFn: async ({ username }: { username: string }) => {
      try {
        if (!program) return !1;
        const [usernameAccountPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("username"),
            Buffer.from(username.toLowerCase()),
            Buffer.from(DOMAINS.DEFAULT),
          ],
          program.programId
        );

        const account =
          await program.account.usernameAccount.fetch(usernameAccountPDA);

        return account;
      } catch {
        return !1;
      }
    },
  });
};

export const useClaimUserName = () => {
  const { program, provider } = useGetMailProgramInstance();
  const { showToast } = useToast();
  return useMutation({
    mutationKey: [QueryKeys.USERNAME_STATUS],
    mutationFn: async ({ username }: { username: string }) => {
      try {
        if (!program) return !1;
        const [usernameAccountPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("username"),
            Buffer.from(username.toLowerCase()),
            Buffer.from(DOMAINS.DEFAULT),
          ],
          program.programId
        );

        // console.log(usernameAccountPDA, usernameAccountPDA.toString());

        try {
          await program.account.usernameAccount.fetch(usernameAccountPDA);
          return !1;
        } catch {
          const [rateLimitPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("rate_limit"), provider.publicKey.toBuffer()],
            program.programId
          );
          console.log("Here");
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

          // const usernameAccountPDA = new PublicKey(
          //   "TLDHkysf5pCnKsVA4gXpNvmy7psXLPEu4LAdDJthT9S"
          // );

          const [mailAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("mail-accountv2"), provider.publicKey.toBuffer()],
            program.programId
          );
          console.log(mailAccountPDA.toString());

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
          console.log("Here", 3);
          showToast("Username created", {
            type: "success",
          });
        }
      } catch (E) {
        console.log(E);
        showToast("Failed to create username", {
          type: "error",
        });
      }
    },
  });
};
