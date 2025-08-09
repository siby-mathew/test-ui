import { IoMail, IoSend } from "react-icons/io5";
import {
  FaCheckToSlot,
  FaMoneyBillWave,
  FaTrash,
  FaWallet,
} from "react-icons/fa6";
import { GrAction } from "react-icons/gr";
import { FaMailBulk, FaWalking } from "react-icons/fa";

import { RiInbox2Fill, RiSpam3Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import {
  MdAnalytics,
  MdDrafts,
  MdEditDocument,
  MdOutlineForwardToInbox,
  MdSmsFailed,
} from "react-icons/md";

import type { MenuConfig } from "src/types";
import { SolmailHeader } from "@components/SolmailHeader";
import { LuMilestone } from "react-icons/lu";

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
    link: "",
    id: "dashboard",
  },
  {
    icon: RiInbox2Fill,
    name: "Inbox",
    link: "",
    id: "inbox",
  },
  {
    icon: MdOutlineForwardToInbox,
    name: "Sent",
    link: "",
    id: "sent",
  },
  {
    icon: FaCheckToSlot,
    name: "Completed",
    link: "",
    id: "complete",
  },
  {
    icon: GrAction,
    name: "Action Required",
    link: "",
    id: "action-required",
  },
  {
    icon: MdDrafts,
    name: "Drafts",
    link: "",
    id: "drafts",
  },
  {
    icon: FaWalking,
    name: "Waiting for others",
    link: "",
    id: "waiting-for-others",
  },
  {
    icon: MdSmsFailed,
    name: "Authentication Failed",
    link: "",
    id: "authentication-failed",
  },
  {
    icon: FaMailBulk,
    name: "Bulk Send",
    link: "",
    id: "bulk-send",
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
    name: "Solsign",
    link: `/u/feature/`,
    id: "feature",
  },
  { icon: FaWallet, name: "Wallet", link: `/u/feature`, id: "wallet" },

  {
    icon: FaMoneyBillWave,
    name: "Rewards",
    link: `/u/rewards/dashboard`,
    id: "rewards",
    submenu: [
      {
        icon: MdAnalytics,
        name: "Overview",
        link: `/u/rewards/dashboard`,
        id: "dashboard",
      },
      {
        icon: LuMilestone,
        name: "Milstones",
        link: `/u/rewards/milestones`,
        id: "milestones",
      },
    ],
  },
];
