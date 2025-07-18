import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { TransferFund } from "@components/Transfer";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import type { PaymentConfig } from "src/types";

const PymentButton: React.FC<PaymentConfig> = ({ ...props }) => {
  const { amount, token } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size={"sm"}
        bg="green.500"
        onClick={onOpen}
        _hover={{
          bg: "green.400",
        }}
      >{`Pay ${amount} ${token}`}</Button>
      <TransferFund
        lockValues={!0}
        key={isOpen ? "open" : "close"}
        isOpen={isOpen}
        onClose={onClose}
        {...props}
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
