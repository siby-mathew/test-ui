import { SolmailInbox } from "@screens/solmail/inbox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/inbox/$id")({
  component: SolmailInbox,
});
