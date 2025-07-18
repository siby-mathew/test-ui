import { Flex } from "@chakra-ui/react";

export const SolanaPayRequest: React.FC<{ amount: string; token: string }> = ({
  amount,
  token,
}) => {
  return (
    <Flex
      bg="green.600"
      fontSize={12}
      px="1"
      borderRadius={3}
      display={"inline-flex"}
    >
      {`Pay ${amount} ${token}`}
    </Flex>
  );
};
