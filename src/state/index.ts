import { atom } from "jotai";
import { MailBoxLabels } from "src/types";

export type AtomType = {
  isComposerOpen: boolean;
  composerState: string;
  composerCollapsed: boolean;
  thread: string;
  ref: string;
  updatingUsername: boolean;
  action: MailShareTypes;
  context: MailBoxLabels;
};

export enum MailShareTypes {
  "reply",
  "forward",
  "none",
}

export const appState = atom<AtomType>({
  isComposerOpen: !1,
  composerCollapsed: !1,
  composerState: "",
  thread: "",
  ref: "",
  action: MailShareTypes.none,
  updatingUsername: !1,
  context: MailBoxLabels.inbox,
});

appState.debugLabel = "AppState";

export type UsernameState = {
  isOpen: boolean;
  requestUsernameLink: boolean;
};
export const useNameState = atom<UsernameState>({
  isOpen: !1,
  requestUsernameLink: !1,
});

useNameState.debugLabel = "UsernameModal";
