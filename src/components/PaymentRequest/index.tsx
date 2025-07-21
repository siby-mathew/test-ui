import { Button, Flex, Image, Spinner, useDisclosure } from "@chakra-ui/react";
import { SolanaPay } from "@components/SolanaPay";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useToken } from "@hooks/useToken";
import { useCallback, useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import type { PaymentConfig, StatusType } from "src/types";
import SolanaPayLogo from "@assets/solanapay-logo.light.svg";
const PymentButton: React.FC<PaymentConfig> = ({ ...props }) => {
  const { amount, token } = props;
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const [{ isDone, isChecking: isStatusChecking }, setStatus] =
    useState<StatusType>({
      isDone: !1,
      isChecking: !0,
    });

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
        onClick={onOpen}
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
