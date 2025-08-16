import { useNameState } from "@state/index";
import { useAtom } from "jotai";

export const useUsernamePopup = () => {
  const [state, set] = useAtom(useNameState);

  const onOpen = () => {
    set((prev) => ({
      ...prev,
      isOpen: !0,
    }));
  };

  const onClose = (forceClosed: boolean = !1) => {
    set((prev) => ({
      ...prev,
      isOpen: !0,
      forceClosed,
    }));
  };

  return {
    ...state,
    set,
    onOpen,
    onClose,
  };
};
