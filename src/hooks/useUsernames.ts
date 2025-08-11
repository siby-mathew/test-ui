import { skipToken, useQuery } from "@tanstack/react-query";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { QueryKeys } from "src/types";
import { useMemo } from "react";

export const useUsernames = () => {
  const { program } = useGetMailProgramInstance();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [QueryKeys.GET_USERNAMES],
    staleTime: 1000 * 60 * 2,
    queryFn: program
      ? async () => {
          try {
            const allAccounts = await program.account.usernameAccount.all();
            return allAccounts;
          } catch {
            return [];
          }
        }
      : skipToken,
  });
  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetMyUsernamesByOwner = (address: string | undefined) => {
  const { data, isLoading } = useUsernames();

  const usernames = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => {
        return item.account.authority.toString() === address;
      })
      .sort(
        (a, b) =>
          Number(a.account.createdAt.toString()) -
          Number(b.account.createdAt.toString())
      );
  }, [address, data]);
  return {
    usernames,
    isLoading,
  };
};

export const useUsernameById = (address: string | undefined) => {
  const { usernames, isLoading } = useGetMyUsernamesByOwner(address);
  const account = useMemo(() => {
    if (!usernames || !usernames.length || !address) {
      return null;
    }

    const linkedAccounts = usernames.filter(
      (acc) => acc.account.mailbox?.toString() === address
    );

    const account = linkedAccounts[0] ?? null;
    return account && account?.account ? account.account : null;
  }, [address, usernames]);

  const username = useMemo(
    () => (account ? account.username?.toString() : null),
    [account]
  );
  const domain = useMemo(() => (account ? account.domain : null), [account]);
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
  };
};
