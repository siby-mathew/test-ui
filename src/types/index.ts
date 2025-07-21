import type { IconType } from "react-icons/lib";
export * from "./mail";
export type MenuConfig = {
  icon: IconType;
  name: string;
  id: string;
  link: string;
  submenu?: MenuConfig[];
  header?: React.FC;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
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
}

export type StatusType = {
  isChecking: boolean;
  isDone: boolean;
};
