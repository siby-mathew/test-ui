import { useContext } from "react";
import { MailContext } from "src/context";

export const useMailBoxContext = () => {
  const context = useContext(MailContext);
  return context;
};
