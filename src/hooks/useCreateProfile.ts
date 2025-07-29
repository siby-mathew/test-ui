import { usePrivy } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "./useHttp";
type Payload = {
  code: string;
};
export const useCreateProfile = () => {
  const { user } = usePrivy();
  const { fetch } = useHttp();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_USER_PROFILE],
    mutationFn: async ({ code }: Payload) => {
      await fetch(`/users/signup`, "POST", {
        user_id: (user?.id ?? "").split(":").pop(),
        referral_code: code,
      });
    },
  });
};
