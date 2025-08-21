import { PaymentScreen }  from "@screens/wallet/PaymentScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/pay/")({
  component: PaymentScreen,
});
