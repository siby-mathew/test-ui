import { PageNotFound } from "@screens/404";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/$not-found")({
  component: PageNotFound,
});
