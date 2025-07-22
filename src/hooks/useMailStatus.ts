import { add, mailStatus, remove } from "@state/status";
import { useAtom } from "jotai";
import { useMemo } from "react";

const FEATURE_START_DATE = new Date("2025-07-22T00:00:00");
export const useMailStatus = (id: string, date?: number) => {
  const [status] = useAtom(mailStatus);
  const [, addItem] = useAtom(add);
  const [, removeItem] = useAtom(remove);
  const isNotRead = useMemo(() => {
    return !!(
      status &&
      status.indexOf(id) === -1 &&
      new Date(date || new Date().getTime()).getTime() >
        FEATURE_START_DATE.getTime()
    );
  }, [date, id, status]);

  return {
    isRead: !isNotRead,
    addItem,
    removeItem,
  };
};
