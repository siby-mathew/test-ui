import { MailBoxLabels } from "src/types";
import { createContext } from "react";

type MailContextType = {
  context: MailBoxLabels;
  name: string;
  id: string | undefined;
};
export const MailContext = createContext<MailContextType>({
  context: MailBoxLabels.inbox,
  name: "",
  id: undefined,
});
