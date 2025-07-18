import { Solmail } from "@components/Solmail";
import { useParams } from "@tanstack/react-router";
import { MailContext } from "src/context";
import { MailBoxLabels } from "src/types";

export const SolmailOutbox: React.FC = () => {
  const { id } = useParams({ from: "/u/_layout/solmail/outbox/$id" });
  return (
    <MailContext.Provider
      value={{
        context: MailBoxLabels.outbox,
        name: "Outbox",
        id: id && id !== "all" ? id : undefined,
      }}
    >
      <Solmail />
    </MailContext.Provider>
  );
};
