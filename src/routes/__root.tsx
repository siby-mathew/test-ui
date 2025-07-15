import { AppMainLayout } from "@layouts/main";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: AppMainLayout,
});
