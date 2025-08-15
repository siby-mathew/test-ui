import { VStack } from "@chakra-ui/react";
import { ActivityCard } from "@components/ActivityCard";
import { useGetTransactions } from "@hooks/useGetTransactions";

export const TransactionsList: React.FC = () => {
  const { data } = useGetTransactions();

  return (
    <VStack w="100%">
      {data &&
        data.map((item: any) => {
          return <ActivityCard transaction={item} />;
        })}
    </VStack>
  );
};
