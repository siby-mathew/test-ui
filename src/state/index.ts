import { atom } from "jotai";
type AtomType = {
  isComposerOpen: boolean;
  composerState: string;
  composerCollapsed: boolean;
};
export const appState = atom<AtomType>({
  isComposerOpen: !1,
  composerCollapsed: !1,
  composerState: "",
});
