import { gql } from "@apollo/client";

export const GET_USER_MAILBOX = gql`
  query GetUserMailbox(
    $userAddress: String!
    $mailType: MailType
    $limit: Int
    $offset: Int
  ) {
    getUserMailbox(
      userAddress: $userAddress
      mailType: $mailType
      limit: $limit
      offset: $offset
    ) {
      address
      mails {
        id
        subject
        body
        fromAddress
        toAddress
        isRead
        parentId
        isEncrypted
        version
        mailbox
        direction
      }
      pagination {
        total
        limit
        offset
        hasNext
        hasPrev
      }
    }
  }
`;
