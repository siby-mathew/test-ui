import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "./useHttp";

import { useAuthStatus } from "./useAuthState";

export const useProfile = () => {
  const { isAuthenticated } = useAuthStatus();
  const { fetch } = useHttp();
  const { data, isLoading, isFetching, refetch, isFetched } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: () => fetch("/profile", "GET"),
    enabled: !!isAuthenticated,
  });

  return {
    data,
    isLoading,
    isFetching,
    requestProfileCreation:
      isFetched && !(data && Object.keys(data).length > 0),
    refetch,
  };
};
