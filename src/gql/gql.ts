/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetUserMailbox(\n    $userAddress: String!\n    $mailType: MailType\n    $limit: Int\n    $offset: Int\n  ) {\n    getUserMailbox(\n      userAddress: $userAddress\n      mailType: $mailType\n      limit: $limit\n      offset: $offset\n    ) {\n      address\n      mails {\n        id\n        subject\n        body\n        fromAddress\n        toAddress\n        isRead\n        parentId\n        isEncrypted\n        version\n        mailbox\n        direction\n      }\n      pagination {\n        total\n        limit\n        offset\n        hasNext\n        hasPrev\n      }\n    }\n  }\n": typeof types.GetUserMailboxDocument,
};
const documents: Documents = {
    "\n  query GetUserMailbox(\n    $userAddress: String!\n    $mailType: MailType\n    $limit: Int\n    $offset: Int\n  ) {\n    getUserMailbox(\n      userAddress: $userAddress\n      mailType: $mailType\n      limit: $limit\n      offset: $offset\n    ) {\n      address\n      mails {\n        id\n        subject\n        body\n        fromAddress\n        toAddress\n        isRead\n        parentId\n        isEncrypted\n        version\n        mailbox\n        direction\n      }\n      pagination {\n        total\n        limit\n        offset\n        hasNext\n        hasPrev\n      }\n    }\n  }\n": types.GetUserMailboxDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserMailbox(\n    $userAddress: String!\n    $mailType: MailType\n    $limit: Int\n    $offset: Int\n  ) {\n    getUserMailbox(\n      userAddress: $userAddress\n      mailType: $mailType\n      limit: $limit\n      offset: $offset\n    ) {\n      address\n      mails {\n        id\n        subject\n        body\n        fromAddress\n        toAddress\n        isRead\n        parentId\n        isEncrypted\n        version\n        mailbox\n        direction\n      }\n      pagination {\n        total\n        limit\n        offset\n        hasNext\n        hasPrev\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserMailbox(\n    $userAddress: String!\n    $mailType: MailType\n    $limit: Int\n    $offset: Int\n  ) {\n    getUserMailbox(\n      userAddress: $userAddress\n      mailType: $mailType\n      limit: $limit\n      offset: $offset\n    ) {\n      address\n      mails {\n        id\n        subject\n        body\n        fromAddress\n        toAddress\n        isRead\n        parentId\n        isEncrypted\n        version\n        mailbox\n        direction\n      }\n      pagination {\n        total\n        limit\n        offset\n        hasNext\n        hasPrev\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;