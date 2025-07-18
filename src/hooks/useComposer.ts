import { appState } from "@state/index";
import { useAtom } from "jotai";

export const useComposer = () => {
  const [{ isComposerOpen, ...other }, update] = useAtom(appState);
  const onOpen = () => {
    update((prev) => {
      return {
        ...prev,
        isComposerOpen: !0,
      };
    });
  };

  const onClose = () => {
    update((prev) => {
      return {
        ...prev,
        isComposerOpen: !1,
        composerCollapsed: !1,
      };
    });
  };

  const collpaseComposer = () => {
    update((prev) => {
      return {
        ...prev,
        composerCollapsed: !0,
      };
    });
  };
  const expandComposer = () => {
    update((prev) => {
      return {
        ...prev,
        composerCollapsed: !1,
      };
    });
  };

  const updateStatus = (composerState: string) => {
    update((prev) => {
      return {
        ...prev,
        composerState,
      };
    });
  };
  return {
    ...other,
    isOpen: isComposerOpen,
    onOpen,
    onClose,
    collpaseComposer,
    expandComposer,
    updateStatus,
  };
};
