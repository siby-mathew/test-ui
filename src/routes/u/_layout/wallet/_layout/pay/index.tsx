import { PaymentScreen } from "@screens/wallet/paymentScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/u/_layout/wallet/_layout/pay/")({
  component: PaymentScreen,
});
