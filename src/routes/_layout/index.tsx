import { Login } from "@screens/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: Login,
});
