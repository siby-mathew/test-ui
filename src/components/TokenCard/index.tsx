import { Flex, Image } from "@chakra-ui/react";
import { useTokenMeta } from "@hooks/useTokensOwned";
import { formatTokenBalance } from "@utils/formating";

import { TokenAccount } from "src/types/token";

export const TokenCard: React.FC<TokenAccount> = ({ mint, amount }) => {
  const { token } = useTokenMeta(mint);

  return (
    <Flex
      flexDirection={"row"}
      w="100%"
      gap={2}
      bg="surface.500"
      p={3}
      borderRadius={8}
      cursor={"pointer"}
      transition={"all ease .2s"}
      _hover={{
        bg: "surface.600",
      }}
    >
      <Flex>
        <Image
          borderRadius={"50%"}
          src={token?.logo ?? ""}
          boxSize={"40px"}
          objectFit={"cover"}
          alt={token?.name ?? ""}
        />
      </Flex>
      <Flex direction={"column"} flex={"auto"}>
        <Flex fontWeight={"medium"}>{token?.symbol}</Flex>
        <Flex fontSize={13}>
          {formatTokenBalance(amount, token?.decimals ?? 9)}
        </Flex>
      </Flex>
      <Flex fontWeight={"bold"} fontSize={13} alignItems={"center"}></Flex>
    </Flex>
  );
};
