import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { ReactNode } from "react";
import { MailBoxLabels } from "src/types";

export const MailOptionRenderer: React.FC<{
  renderWhen: MailBoxLabels[];
  children: ReactNode;
}> = ({ renderWhen = [], children }) => {
  const { context } = useMailBoxContext();
  const shouldRender = renderWhen.indexOf(context) > -1;
  return shouldRender ? children : null;
};
