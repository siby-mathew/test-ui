import { skipToken, useQuery } from "@tanstack/react-query";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { QueryKeys } from "src/types";
import { useMemo } from "react";

export const useUsernames = () => {
  const { program } = useGetMailProgramInstance();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QueryKeys.GET_USERNAMES],
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
  };
};

export const useUsernameById = (address: string | undefined) => {
  const { data, isLoading } = useUsernames();
  const account = useMemo(() => {
    if (!data || !data.length || !address) {
      return null;
    }
    const account = data.find(({ account }) => {
      return account.authority.toString() === address.toString();
    });
    return account?.account ? account.account : null;
  }, [address, data]);

  const username = account ? account.username?.toString() : null;
  const domain = account ? account.domain : null;
  const fullUsername = username && domain ? `${username}@${domain}` : null;
  return {
    address,
    username,
    domain,
    isLoading: isLoading,
    fullUsername,
    displayName: fullUsername || username || address || "",
  };
};
