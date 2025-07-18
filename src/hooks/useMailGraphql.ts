import { useQuery } from "@apollo/client";
import { GET_USER_MAILBOX } from "@integrations/idl/graphql/queries/getMailBox";
import { usePrivyWallet } from "./usePrivyWallet";
import {
  MailType,
  type GetUserMailboxQuery,
  type GetUserMailboxQueryVariables,
} from "src/gql/graphql";

export const useMailBoxGraphql = () => {
  const { wallet } = usePrivyWallet();
  const { loading, error, data } = useQuery<
    GetUserMailboxQuery,
    GetUserMailboxQueryVariables
  >(GET_USER_MAILBOX, {
    variables: {
      userAddress: wallet?.address.toString() ?? "",
      mailType: MailType.All,
      limit: 10,
      offset: 0,
    },
  });
};
