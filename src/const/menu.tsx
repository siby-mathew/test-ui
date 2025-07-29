import { IoMail, IoSend, IoSettingsSharp } from "react-icons/io5";
import { FaCheckToSlot, FaTrash, FaWallet } from "react-icons/fa6";
import { GrAction } from "react-icons/gr";
import { FaMailBulk, FaSmile, FaWalking } from "react-icons/fa";

import { RiInbox2Fill, RiShutDownLine, RiSpam3Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import {
  MdDrafts,
  MdEditDocument,
  MdOutlineForwardToInbox,
  MdSmsFailed,
} from "react-icons/md";

import { TbArrowsTransferDown } from "react-icons/tb";
import type { MenuConfig } from "src/types";
import { SolmailHeader } from "@components/SolmailHeader";

export const SOLMAIL_MENU: MenuConfig[] = [
  {
    icon: IoMail,
    name: "Inbox",
    link: "/u/solmail/inbox/all",
    id: "inbox",
  },
  {
    icon: IoSend,
    name: "Sent",
    link: "/u/solmail/outbox/all",
    id: "outbox",
  },
  {
    icon: RiSpam3Fill,
    name: "Spam",
    link: "/u/solmail/spam/all",
    id: "spam",
  },
  {
    icon: FaTrash,
    name: "Trash",
    link: "/u/solmail/trash/all",
    id: "trash",
  },
];

export const DOCUSIGN_MENU: MenuConfig[] = [
  {
    icon: GoHomeFill,
    name: "Home",
    link: "/u/docusign/dashboard",
    id: "dashboard",
  },
  {
    icon: RiInbox2Fill,
    name: "Inbox",
    link: "/u/docusign/inbox",
    id: "inbox",
  },
  {
    icon: MdOutlineForwardToInbox,
    name: "Sent",
    link: "/u/docusign/inbox",
    id: "sent",
  },
  {
    icon: FaCheckToSlot,
    name: "Completed",
    link: "/u/docusign/complete",
    id: "complete",
  },
  {
    icon: GrAction,
    name: "Action Required",
    link: "/u/docusign/action-required",
    id: "action-required",
  },
  {
    icon: MdDrafts,
    name: "Drafts",
    link: "/u/docusign/drafts",
    id: "drafts",
  },
  {
    icon: FaWalking,
    name: "Waiting for others",
    link: "/u/docusign/waiting-for-others",
    id: "waiting-for-others",
  },
  {
    icon: MdSmsFailed,
    name: "Authentication Failed",
    link: "/u/docusign/authentication-failed",
    id: "authentication-failed",
  },
  {
    icon: FaMailBulk,
    name: "Bulk Send",
    link: "/u/docusign/bulk-send",
    id: "bulk-send",
  },
];

const PROFILE_MENU: MenuConfig[] = [
  {
    icon: IoSettingsSharp,
    name: "Settings",
    id: "settings",
    link: "",
  },
  {
    icon: RiShutDownLine,
    name: "Signout",
    id: "signout",
    link: "",
    onClick: () => {
      localStorage.clear();
      window.location.reload();
    },
  },
];
export const MENU: MenuConfig[] = [
  {
    icon: IoMail,
    name: "Solmail",
    link: `/u/solmail/inbox/all`,
    id: "solmail",
    submenu: SOLMAIL_MENU,
    header: () => <SolmailHeader />,
  },
  {
    icon: MdEditDocument,
    name: "Docusign",
    link: `/u/docusign/dashboard`,
    id: "docusign",
    submenu: DOCUSIGN_MENU,
  },
  { icon: FaWallet, name: "Wallet", link: `/u/wallet/trade`, id: "wallet" },
  {
    icon: TbArrowsTransferDown,
    name: "Transactions",
    link: `/u/solmail/inbox`,
    id: "transactions",
    submenu: [],
  },
  {
    icon: FaSmile,
    name: "Rewards",
    link: `/u/rewards`,
    id: "rewards",
    submenu: PROFILE_MENU,
  },
];
