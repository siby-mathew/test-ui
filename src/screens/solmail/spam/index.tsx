import { Solmail } from "@components/Solmail";
import { useParams } from "@tanstack/react-router";
import { MailContext } from "src/context";
import { MailBoxLabels } from "src/types";

export const SolmailSpam: React.FC = () => {
  const { id } = useParams({ from: "/u/_layout/solmail/spam/$id" });
  return (
    <MailContext.Provider
      value={{
        context: MailBoxLabels.spam,
        name: "Spam",
        id: id && id !== "all" ? id : undefined,
      }}
    >
      <Solmail />
    </MailContext.Provider>
  );
};
