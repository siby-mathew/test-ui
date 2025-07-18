import { chakra, Flex, Icon, SkeletonText } from "@chakra-ui/react";
import { useBalance } from "@hooks/useBalance";

import { keyframes } from "@emotion/react";
import { TbReload } from "react-icons/tb";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SolBalance: React.FC = () => {
  const { formattedBalance, refetch, isRefetching, isFetched, isFetching } =
    useBalance();

  const isLoading = !isFetched || isFetching || isRefetching;

  return (
    <Flex alignItems={"center"} px={1}>
      <chakra.span fontSize={14}>
        <SkeletonText
          startColor="surface.600"
          noOfLines={1}
          minW={"20px"}
          isLoaded={!isLoading}
        >
          {formattedBalance}
        </SkeletonText>
      </chakra.span>

      <chakra.span
        display="inline-flex"
        onClick={() => refetch()}
        animation={isLoading ? `${spin} .4s linear infinite` : undefined}
        ml={1}
        cursor="pointer"
      >
        <Icon as={TbReload} />
      </chakra.span>
    </Flex>
  );
};
