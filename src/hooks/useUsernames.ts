import { skipToken, useQuery } from "@tanstack/react-query";
import { useGetMailProgramInstance } from "./useMailProgramInstance";
import { QueryKeys } from "src/types";

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
