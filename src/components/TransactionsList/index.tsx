import { Flex } from "@chakra-ui/react";
import { useGetTransactions } from "@hooks/useGetTransactions";

export const TransactionsList: React.FC = () => {
  const { data } = useGetTransactions();

  return <Flex>Hello</Flex>;
};
