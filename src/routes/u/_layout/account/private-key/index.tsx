import { ExportPrivateKey } from "@screens/Account/PrivateKKey";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/account/private-key/")({
  component: ExportPrivateKey,
});
