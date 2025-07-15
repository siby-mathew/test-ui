import { UserLayout } from "@layouts/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout")({
  component: UserLayout,
});
