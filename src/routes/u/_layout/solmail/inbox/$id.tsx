import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/solmail/inbox/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
