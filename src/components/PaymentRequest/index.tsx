import { Button, Flex, Image, Spinner, useDisclosure } from "@chakra-ui/react";
import { SolanaPay } from "@components/SolanaPay";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useToken } from "@hooks/useToken";
import { useCallback, useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import type { PaymentConfig, StatusType } from "src/types";

import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSolanaPayLogo } from "@hooks/useSolanaPayLogo";
const PymentButton: React.FC<PaymentConfig> = ({ ...props }) => {
  const SolanaPayLogo = useSolanaPayLogo();
  const { id, context } = useMailBoxContext();
  const { mail } = useMailBody(id, context);
  const { amount, token } = props;
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const { wallet } = usePrivyWallet();
  const [{ isDone, isChecking: isStatusChecking }, setStatus] =
    useState<StatusType>({
      isDone: !1,
      isChecking: !0,
    });

  const openPayment = () => {
    if (
      mail &&
      mail.from &&
      mail.from.toString() !== wallet?.address?.toString()
    ) {
      onOpen();
    }
  };

  const onStatusChange = useCallback(
    (s: StatusType) => {
      setStatus(s);
    },
    [setStatus]
  );

  const { symbol } = useToken(token ?? "");
  return (
    <>
      <Button
        size={"sm"}
        onClick={openPayment}
        rightIcon={isDone ? <IoCheckmarkDoneSharp /> : undefined}
      >
        {isStatusChecking && <Spinner size={"sm"} mr={2} />}
        <Image mr={1} src={SolanaPayLogo} w="50px" />
        {`${amount} ${symbol}`}
      </Button>

      <SolanaPay
        isOpen={isOpen}
        onClose={onClose}
        onStatusChange={onStatusChange}
        amount={props.amount}
        message={props.message}
        recipient={props.recipient}
        token={props.token}
      />
    </>
  );
};
export const PaymentRequests: React.FC = () => {
  const { id, context } = useMailBoxContext();
  const { payments } = useMailBody(id, context);

  return (
    <Flex direction={"row"} flexWrap={"wrap"} my={2}>
      {payments.map((item, index) => {
        return <PymentButton key={index} {...item} />;
      })}
    </Flex>
  );
};
