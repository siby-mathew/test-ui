import { useQuery } from "@tanstack/react-query";
import { Milestone, QueryKeys } from "src/types";
import { useHttp } from "./useHttp";

type Milestones = {
  [key: `MILESTONE#${number}`]: Milestone;
};

export const useMilestones = () => {
  const { fetch } = useHttp();
  return useQuery<Partial<Milestones>>({
    queryKey: [QueryKeys.MILESTONES],
    placeholderData: () => {
      return {};
    },
    queryFn: async () => {
      try {
        const data = await fetch(`/milestones`, "GET");
        return data.data ?? {};
      } catch {
        return {};
      }
    },
  });
};
