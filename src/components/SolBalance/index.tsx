import { chakra, Flex, Icon, SkeletonText, Image } from "@chakra-ui/react";
import { useBalance } from "@hooks/useBalance";

import { keyframes } from "@emotion/react";
import { TbReload } from "react-icons/tb";
import SolanaLogo from "@assets/solanaLogoMark.svg";
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SolBalance: React.FC = () => {
  const { formattedBalance, refetch, isRefetching, isFetched, isFetching } =
    useBalance();

  const isLoading = !isFetched || isFetching || isRefetching;

  return (
    <Flex
      alignItems={"center"}
      px={1}
      justifyContent={"center"}
      fontSize={13}
      gap={1}
    >
      <chakra.span alignItems={"center"} display={"inline-flex"}>
        <Image
          src={SolanaLogo}
          boxSize="16px"
          alt={"solana"}
          border={"none"}
          outline={"none"}
        />
      </chakra.span>
      <chakra.span>
        <SkeletonText
          startColor="surface.600"
          noOfLines={1}
          minW={"20px"}
          isLoaded={!isLoading}
          fontWeight={"normal"}
        >
          {formattedBalance}
        </SkeletonText>
      </chakra.span>

      <chakra.span
        display="inline-flex"
        onClick={() => refetch()}
        animation={isLoading ? `${spin} .4s linear infinite` : undefined}
        cursor="pointer"
      >
        <Icon as={TbReload} />
      </chakra.span>
    </Flex>
  );
};
