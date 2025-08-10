import { Flex } from "@chakra-ui/react";
import { useQuickNodeQuery } from "@hooks/useQuickNode";

export const Holdings: React.FC = () => {
  const { data } = useQuickNodeQuery({
    method: "getTokenAccountsByOwner",
    params: [
      "GwY12ec3ZvdiwHqBe7MczovHYRkL7zpc23nMaaKcqixP",
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed" },
    ],
  });

  console.log(data);
  return <Flex>holdings</Flex>;
};
