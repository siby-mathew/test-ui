import { ReferralDashboard } from "@screens/rewards/landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/rewards/")({
  component: ReferralDashboard,
});
