import { Flex, VStack } from "@chakra-ui/react";
// import { useGetTransactionById } from "@hooks/useGetTransactionById";

// import { SolanaTransactionSignatureInfo } from "src/types/token";

// const TransactionCard: React.FC<SolanaTransactionSignatureInfo> = ({
//   signature,
// }) => {
//   const { data } = useGetTransactionById(signature);
//   return <Flex>{JSON.stringify(data)}</Flex>;
// };
export const Transactions: React.FC = () => {
  return (
    <Flex w="100%">
      <VStack></VStack>
    </Flex>
  );
};
