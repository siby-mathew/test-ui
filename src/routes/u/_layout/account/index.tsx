import { AccountPage } from "@screens/Account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/account/")({
  component: AccountPage,
});
