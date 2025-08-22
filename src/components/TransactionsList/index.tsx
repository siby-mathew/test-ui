import { Flex, Spinner, VStack } from "@chakra-ui/react";
import { ActivityCard } from "@components/ActivityCard";
import { useGetTransactions } from "@hooks/useGetTransactions";

export const TransactionsList: React.FC = () => {
  const { data, isLoading } = useGetTransactions();

  return (
    <VStack w="100%">
      {isLoading && (
        <Flex p={100} alignItems={"center"} justifyContent={"center"}>
          <Spinner />
        </Flex>
      )}
      {data &&
        data.map((item: any) => {
          return <ActivityCard transaction={item} />;
        })}
    </VStack>
  );
};
