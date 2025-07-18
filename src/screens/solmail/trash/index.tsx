import { Solmail } from "@components/Solmail";
import { useParams } from "@tanstack/react-router";
import { MailContext } from "src/context";
import { MailBoxLabels } from "src/types";

export const SolmailTrash: React.FC = () => {
  const { id } = useParams({ from: "/u/_layout/solmail/trash/$id" });
  return (
    <MailContext.Provider
      value={{
        context: MailBoxLabels.trash,
        name: "Trash",
        id: id && id !== "all" ? id : undefined,
      }}
    >
      <Solmail />
    </MailContext.Provider>
  );
};
