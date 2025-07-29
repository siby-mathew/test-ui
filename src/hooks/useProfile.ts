import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "./useHttp";

import { useAuthStatus } from "./useAuthState";

type Profile = {
  pk: string;
  referred_by: string;
  referral_code: string;
  milestone: {
    title: string;
    boost_factor: number;
  };
  xp: {
    offset: number;
    amount: number;
    transactions: {
      amount: number;
      event_type: string;
      timestamp: string;
    }[];
  };
  timestamp: string;
};
export const useProfile = () => {
  const { isAuthenticated } = useAuthStatus();
  const { fetch } = useHttp();
  const { data, isLoading, isFetching, refetch, isFetched } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: () => fetch<Profile | undefined>("/profile", "GET"),
    enabled: !!isAuthenticated,
  });

  return {
    data: data?.data,
    isLoading,
    isFetching,
    requestProfileCreation:
      isFetched && !(data && Object.keys(data).length > 0),
    refetch,
  };
};
