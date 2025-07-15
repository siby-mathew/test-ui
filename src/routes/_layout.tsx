import { AppMainLayout } from "@layouts/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: AppMainLayout,
});
