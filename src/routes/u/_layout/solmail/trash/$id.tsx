import { SolmailTrash } from "@screens/solmail/trash";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/trash/$id")({
  component: SolmailTrash,
});
