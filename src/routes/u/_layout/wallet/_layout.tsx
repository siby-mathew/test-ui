import { WalletLayout } from "@layouts/wallet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout")({
  component: WalletLayout,
});
