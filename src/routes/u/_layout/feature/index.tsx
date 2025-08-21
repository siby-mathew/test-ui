import { ComingSoonPage } from "@screens/comingSoon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/feature/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoonPage />;
}
