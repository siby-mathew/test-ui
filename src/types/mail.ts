import { PublicKey } from "@solana/web3.js";
import { type ProgramAccount } from "@coral-xyz/anchor";
import type { SolanaPayPayload } from ".";
export interface SolMailV2 {
  from: PublicKey;
  to: PublicKey;
  markAsRead: boolean;
  label:
    | { Inbox: object }
    | { Outbox: object }
    | { Read: object }
    | { Trash: object }
    | { Spam: object };
  createdAt: number;
  mailbox: PublicKey;
  id: string;
  parentId: string;
  subject: string;
  body: string;
  authority: PublicKey;
  iv: string;
  salt: string;
  version: string;
}

export interface SolMail {
  from: PublicKey;
  to: PublicKey;
  id: string;
  parentId: string;
  markAsRead: boolean;
  createdAt: number;
  subject: string;
  body: string;
  authority: PublicKey;
  iv: string;
  salt: string;
  version: string;
}

export type FetchAllMailsResult = (
  | ProgramAccount<SolMailV2>
  | ProgramAccount<SolMail>
)[];

export type FormattedMailBox = Pick<
  SolMail,
  | "body"
  | "from"
  | "id"
  | "iv"
  | "salt"
  | "subject"
  | "to"
  | "version"
  | "markAsRead"
  | "createdAt"
> & {
  user0: PublicKey;
  user1: PublicKey;
  isV1: boolean;
  encKey: string;
  labelIdentifier: MailBoxLabels;
} & Partial<Pick<SolMailV2, "label">>;

export type Attachment = {
  name: string;
  size: string;
  src: string;
  type: string;
};

export type PaymentConfig = {
  recipient: string;
  amount: string;
  message: string;
  token: string;
};

export enum MailBoxLabels {
  "inbox" = "inbox",
  "outbox" = "outbox",
  "trash" = "trash",
  "spam" = "spam",
  "unknown" = "unknown",
}

export enum MailLabelIndex {
  "trash" = 3,
  "spam" = 4,
}

export type ComposerFormInputs = {
  to: string;
  subject: string;
  body: string;
  files: File[];
  solanaPay?: SolanaPayPayload;
};

export enum StorageVersion {
  "pinata" = "0.0.5",
  "arweave" = "0.0.4",
}
