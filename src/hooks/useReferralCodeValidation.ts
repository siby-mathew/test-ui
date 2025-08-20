import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useHttp } from "@hooks/useHttp";

export const useRefCodeValidation = () => {
  const { fetch } = useHttp();
  return useMutation({
    mutationKey: [QueryKeys.MUTATION_VALIDATE_REF_CODE],
    mutationFn: async ({ code }: { code: string }) => {
      const { data } = await fetch<{ code: string }>(
        `/referral-code/${code}`,
        "POST"
      );
      if (data && data.code) {
        alert(data.code);
      }
    },
  });
};
