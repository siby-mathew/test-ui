import { isValidAddress } from "@utils/string";
import { PublicKey } from "@solana/web3.js";
import { useUsernameStatus } from "./useUsername";
import { DOMAINS } from "@const/domain";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "src/types";
import { useQuickNode } from "./useQuickNode";
import { usePrivyWallet } from "./usePrivyWallet";

const getRegex = () => {
  const SOME_CONST_ARRAY = [DOMAINS.DEFAULT];
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedArray = SOME_CONST_ARRAY.map(escapeRegex);
  escapedArray.push("\\.sol");
  const pattern = new RegExp(`(${escapedArray.join("|")})$`);
  return pattern;
};

export const SAME_ADDRESS_ERROR =
  "Recipient address cannot be the same as your own address.";
export const useEmailResolver = () => {
  const { address } = usePrivyWallet();
  const { mutateAsync } = useUsernameStatus();
  const { mutateAsync: parseSnsRecord } = useQuickNode();
  const regex = getRegex();
  return useMutation<
    { status: boolean; address?: PublicKey; message?: string } | null,
    unknown,
    { username: string }
  >({
    mutationKey: [QueryKeys.EMAIL_RESOLVER],
    mutationFn: async ({ username }) => {
      try {
        if (isValidAddress(username)) {
          if (username === address) {
            return {
              status: !1,
              message: SAME_ADDRESS_ERROR,
            };
          }
          return { status: !0, address: new PublicKey(username) };
        }

        if (!regex.test(username)) {
          return {
            status: !1,
            message: "Invalid domain",
          };
        }

        if (username.indexOf(DOMAINS.DEFAULT) > -1) {
          const user = username.slice(0, username.indexOf(DOMAINS.DEFAULT));

          const account = await mutateAsync({ username: user });

          if (account && account.authority) {
            if (address === account.authority.toString()) {
              return {
                status: !1,
                message: SAME_ADDRESS_ERROR,
              };
            }
            return {
              status: !0,
              address: account.authority,
            };
          } else {
            return {
              status: !1,
              message: "No account found",
            };
          }
        }

        if (username.endsWith(".sol")) {
          const data = await parseSnsRecord({
            method: "sns_getDomainKey",
            params: [username],
          });
          if (data && isValidAddress(data)) {
            return { status: !0, address: data };
          }
        }
        return {
          status: !1,
          message: "No account found",
        };
      } catch {
        return {
          status: !1,
          message: "Invalid address",
        };
      }
    },
  });
};
