import { ActivityPage } from "@screens/wallet/pctivitypage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/activity/")({
  component: ActivityPage,
});
