import { ComingSoonPage } from "@screens/comingsoon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/feature/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoonPage />;
}
