import { TransferToken } from "@components/TransferToken";
import { WalletContainerSmall } from "@components/WalletContainerSmall";

export const PaymentScreen: React.FC = () => {
  return (
    <WalletContainerSmall>
      <TransferToken />{" "}
    </WalletContainerSmall>
  );
};
