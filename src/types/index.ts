import { ReactElement } from "react";
import type { IconType } from "react-icons/lib";
export * from "./mail";
export * from "./referrals";
export type MenuConfig = {
  icon: IconType;
  name: string;
  id: string;
  link: string;
  submenu?: MenuConfig[];
  header?: () => ReactElement;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  skipRender?: boolean;
};

export enum QueryKeys {
  "ENCRYPTION_KEY" = "ENCRYPTION_KEY",
  "MAIL_BODY" = "MAIL_BODY",
  "MAILBOX" = "MAILBOX",
  "LABEL_INDEX_UPDATE" = "LABEL_INDEX_UPDATE",
  "MAILBOX_STATUS" = "MAILBOX_STATUS",
  "CREATE_MAILBOX" = "CREATE_MAILBOX",
  "CREATE_CREDENTIALS" = "CREATE_CREDENTIALS",
  "SOL_BALANCE" = "SOL_BALANCE",
  "USER_PROFILE" = "USER_PROFILE",
  "CREATE_USER_PROFILE" = "CREATE_USER_PROFILE",
  "REWARDS_LIST" = "REWARDS_LIST",
  "UPDATE_REFERAL_CODE" = "UPDATE_REFERAL_CODE",
  "USERNAME_STATUS" = "USERNAME_STATUS",
  "GET_USERNAMES" = "GET_USERNAMES",
  "EMAIL_RESOLVER" = "EMAIL_RESOLVER",
  "MILESTONES" = "MILESTONES",
  "QUICKNODE" = "QUICKNODE",
  "TRANSFER" = "TRANSFER",
  "CLAIM_USERNAME" = "CLAIM_USERNAME",
  "QUICK_NODE_QUERY" = "QUICK_NODE_QUERY",
  "TOKENS" = "TOKENS",
  "UNLINNK_USERNAME" = "UNLINNK_USERNAME",
  "PAYMENT_TRANSFER" = "PAYMENT_TRANSFER",
  "SOL_PRICE" = "SOL_PRICE",
  "GET_USERNAMES_BY_ID" = "GET_USERNAMES_BY_ID",

  "MUTATION_GET_SIGNER_MESSAGE" = "MUTATION_GET_SIGNER_MESSAGE",
  "MUTATION_PINATA_TOKEN" = "MUTATION_PINATA_TOKEN",
  "MUTATION_UPLOAD_TO_PINATA" = "MUTATION_UPLOAD_TO_PINATA",
}

export type StatusType = {
  isChecking: boolean;
  isDone: boolean;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  address: string;
  decimals: number;
};

export type SolanaPayPayload = {
  recipient: string;
  amount: string;
  message: string;
  tokenaddress: string;
};
