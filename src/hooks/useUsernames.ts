import { skipToken, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { QueryKeys } from "src/types";
import { useMemo } from "react";
import { PublicKey } from "@solana/web3.js";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { usePrivyWallet } from "./usePrivyWallet";

export enum FilterOffsets {
  withAuthority = 8,
  withMailBox = 77,
}

export const useUsernameUpdater = () => {
  const { address } = usePrivyWallet();
  const queryClient = useQueryClient();
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.GET_USERNAMES_BY_ID, address],
    });
  };
  return {
    refetch,
  };
};
export const useGetUsernames = (
  address: string | undefined,
  offset: FilterOffsets = FilterOffsets.withAuthority
) => {
  const { program } = useGetMailProgramInstance();
  const { data, isLoading, isFetching, refetch, isFetched } = useQuery({
    queryKey: [QueryKeys.GET_USERNAMES_BY_ID, address, offset],
    staleTime: 1000 * 60 * 2,
    enabled: !!(address && address.trim()),
    queryFn: program
      ? async () => {
          let base58: string = address ?? "";
          if (offset === FilterOffsets.withMailBox) {
            const targetMailbox = new PublicKey(address ?? "");
            const mailboxBytes = targetMailbox.toBuffer();
            const optionSomeBytes = Buffer.concat([
              Buffer.from([1]),
              mailboxBytes,
            ]);

            base58 = bs58.encode(optionSomeBytes);
          }
          try {
            const allAccounts = await program.account.usernameAccount.all([
              {
                memcmp: {
                  bytes: base58,
                  offset,
                },
              },
            ]);
            return allAccounts;
          } catch (e) {
            console.log(e);
            return [];
          }
        }
      : skipToken,
  });

  const usernames = useMemo(() => {
    if (!data) return [];
    return data.sort(
      (a, b) =>
        Number(a.account.createdAt.toString()) -
        Number(b.account.createdAt.toString())
    );
  }, [data]);
  return {
    usernames,
    isLoading,
    isFetching,
    refetch,
    isFetched,
  };
};

export const useGetMyUsernames = (address: string | undefined) => {
  return useGetUsernames(address, FilterOffsets.withAuthority);
};

export const useGetLinkedUsernameById = (address: string | undefined) => {
  const { usernames: usernameCollection } = useGetMyUsernames(address);
  const { usernames, isLoading, isFetched } = useGetUsernames(
    address,
    FilterOffsets.withMailBox
  );
  const account = useMemo(() => {
    if (!usernames || !usernames.length || !address) {
      return null;
    }

    const linkedAccounts = usernames.filter(
      (acc) => acc.account.mailbox?.toString() === address
    );

    const account = linkedAccounts[0] ?? null;
    return account && account?.account ? account : null;
  }, [address, usernames]);

  const username = useMemo(
    () => (account ? account.account.username?.toString() : null),
    [account]
  );
  const domain = useMemo(
    () => (account ? account.account.domain : null),
    [account]
  );
  const fullUsername = useMemo(
    () => (username && domain ? `${username}@${domain}` : null),
    [domain, username]
  );

  return {
    address,
    username,
    domain,
    isLoading: isLoading,
    fullUsername,
    displayName: fullUsername || username || address || "",
    isWalletAddress: !fullUsername && !username,
    hasUserNames: usernameCollection && usernameCollection.length > 0,
    account,
    isFetched,
  };
};
