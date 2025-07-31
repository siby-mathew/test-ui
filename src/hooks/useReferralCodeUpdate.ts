import { useHttp } from "@hooks/useHttp";
import { useProfile } from "./useProfile";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useToast } from "./useToast";

export const useReferralCodeUpdate = () => {
  const { fetch } = useHttp();
  const { refetch } = useProfile();
  const { showToast } = useToast();
  const onFail = (message: string = "") => {
    showToast(message || "Failed to update referral code", {
      type: "error",
    });
  };
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_REFERAL_CODE],
    mutationFn: async ({ code }: { code: string }) => {
      await fetch(`/users/referral-code`, "PUT", {
        referral_code: code.toUpperCase(),
      });
      refetch();
    },
    onError: (r) => {
      onFail(r.message ?? "");
    },
    onSuccess: () => {
      showToast("Referral code updated", {
        type: "success",
      });
    },
  });
};
