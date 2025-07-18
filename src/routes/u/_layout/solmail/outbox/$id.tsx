import { SolmailOutbox } from "@screens/solmail/outbox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/outbox/$id")({
  component: SolmailOutbox,
});
