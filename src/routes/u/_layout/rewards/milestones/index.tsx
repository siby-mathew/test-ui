import { Milestones } from "@screens/milestones";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/rewards/milestones/")({
  component: Milestones,
});
