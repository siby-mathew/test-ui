import { AccountPage } from "@screens/account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/account/")({
  component: AccountPage,
});
