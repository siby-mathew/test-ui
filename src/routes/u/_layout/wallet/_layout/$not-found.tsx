import { PageNotFound } from "@screens/404";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/$not-found")({
  component: PageNotFound,
});
