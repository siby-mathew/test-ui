import { useNameState, UsernameState } from "@state/index";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useUsernamePopup = () => {
  const [state, set] = useAtom(useNameState);

  const onOpen = useCallback(() => {
    set((prev) => ({
      ...prev,
      isOpen: !0,
    }));
  }, [set]);

  const onClose = useCallback(
    (forceClosed: boolean = !1) => {
      set((prev) => ({
        ...prev,
        isOpen: !1,
        forceClosed,
      }));
    },
    [set]
  );

  const onUpdate = useCallback(
    (val: Partial<UsernameState>) => {
      set((prev) => ({
        ...prev,
        ...val,
      }));
    },
    [set]
  );

  const onCloseLinking = useCallback(
    (forceClose: boolean = !1) => {
      set((prev) => ({
        ...prev,
        ignoredUsernameLinking: forceClose,
        requestUsernameLink: !1,
      }));
    },
    [set]
  );

  return {
    ...state,
    set,
    onOpen,
    onClose,
    onUpdate,
    onCloseLinking,
  };
};
