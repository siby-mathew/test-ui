import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "@hooks/useHttp";

import { useAuthStatus } from "./useAuthState";

type RewardXP = {
  amount?: string;
  event_type: string;
  sk: string;
  pk: string;
  timestamp: string;
  reward_amount?: number;
  target_user?: string;
};

type RewardXPList = RewardXP[];

export const useRewardsList = () => {
  const { isAuthenticated } = useAuthStatus();
  const { fetch } = useHttp();
  const { data, isLoading, isFetching, refetch, isFetched } = useQuery({
    queryKey: [QueryKeys.REWARDS_LIST],
    queryFn: () => fetch<RewardXPList | undefined>("/users/rewards", "GET"),
    enabled: !!isAuthenticated,
    staleTime: 60 * 1000 * 2,
  });

  return {
    data: data?.data,
    isLoading,
    isFetching,
    isFetched,
    refetch,
  };
};
