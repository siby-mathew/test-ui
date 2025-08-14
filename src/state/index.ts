import { atom } from "jotai";
export type AtomType = {
  isComposerOpen: boolean;
  composerState: string;
  composerCollapsed: boolean;
  thread: string;
  ref: string;
  updatingUsername: boolean;
  action: MailShareTypes;
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
});

appState.debugLabel = "AppState";
