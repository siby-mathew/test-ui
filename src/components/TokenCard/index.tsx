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
      p={3}
      borderRadius={8}
      cursor={"pointer"}
      transition={"all ease .2s"}
    >
      <Flex boxSize={"40px"} bg="surface.300" borderRadius={"50%"}>
        <Image
          borderRadius={"50%"}
          src={token?.logo ?? ""}
          boxSize={"100%"}
          objectFit={"cover"}
          alt={token?.name ?? ""}
          opacity={0}
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        />
      </Flex>

      <Flex flex={"auto"} direction={"column"}>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Flex fontWeight={"bold"}>{token?.symbol}</Flex>
          <Flex fontWeight={"bold"}>
            {formatTokenBalance({
              rawAmount: amount,
              mintDecimals: token?.decimals ?? 9,
            })}
          </Flex>
        </Flex>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Flex opacity={0.5}>{token?.name ?? ""}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
