import { UserLayout } from "@layouts/user";
import { PageNotFound } from "@screens/404";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout")({
  component: UserLayout,
  notFoundComponent: PageNotFound,
});
