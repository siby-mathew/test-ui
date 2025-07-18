import { Solmail } from "@components/Solmail";
import { useParams } from "@tanstack/react-router";
import { MailContext } from "src/context";
import { MailBoxLabels } from "src/types";

export const SolmailInbox: React.FC = () => {
  const { id } = useParams({ from: "/u/_layout/solmail/inbox/$id" });
  return (
    <MailContext.Provider
      value={{
        context: MailBoxLabels.inbox,
        name: "Inbox",
        id: id && id !== "all" ? id : undefined,
      }}
    >
      <Solmail />
    </MailContext.Provider>
  );
};
