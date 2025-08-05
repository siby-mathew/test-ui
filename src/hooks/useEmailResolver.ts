import { useMutation } from "@tanstack/react-query";
import { useSolanaConnection } from "./useConnection";
import { QueryKeys } from "src/types";
import { resolveEmail } from "@utils/string";

export const useEmailResolver = () => {
  const connection = useSolanaConnection();
  return useMutation({
    mutationKey: [QueryKeys.EMAIL_RESOLVER],
    mutationFn: async ({ address }: { address: string }) => {
      try {
        const resolvedMail = await resolveEmail(address, connection);
        console.log(resolvedMail);
      } catch {
        return !1;
      }
    },
  });
};
