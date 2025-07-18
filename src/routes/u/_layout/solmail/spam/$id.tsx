import { SolmailSpam } from "@screens/solmail/spam";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/spam/$id")({
  component: SolmailSpam,
});
