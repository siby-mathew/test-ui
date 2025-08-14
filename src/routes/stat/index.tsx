import { Status } from "@screens/status";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stat/")({
  component: Status,
});
