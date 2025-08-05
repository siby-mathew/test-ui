import { chakra, Container, Flex, HStack, VStack } from "@chakra-ui/react";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { useMilestones } from "@hooks/useMilestones";
import { useProfile } from "@hooks/useProfile";

import { Milestone } from "src/types";

const MileStoneCard: React.FC<
  Milestone & {
    isActive: boolean;
  }
> = ({ title, icon, boost_factor, maximum, isActive }) => {
  return (
    <Flex
      direction={"column"}
      w="100%"
      borderRadius={10}
      transition={"all ease .2s"}
      cursor={"pointer"}
      bg={"surface.200"}
      color={"light.100"}
      bgGradient={
        isActive
          ? "linear(to-tr, solana.middle, surface.200, surface.200,solana.middle)"
          : ""
      }
      border={"solid 2px"}
      borderColor={isActive ? "solana.middle" : "transparent"}
      _hover={{
        opacity: 0.8,
      }}
    >
      <Flex fontSize={16} p={2} py={3} borderTopRadius={12} fontWeight={"bold"}>
        {icon}
        <chakra.span ml={2}>{title}</chakra.span>
      </Flex>
      <HStack px={4} pb={2}>
        <Flex direction={"column"} flex={"auto"}>
          <Flex fontWeight={"bold"}>Milestone</Flex>
          <Flex opacity={0.6} fontSize={12}>
            🔥{maximum + 1}
          </Flex>
        </Flex>
        <Flex direction={"column"} flex={"auto"}>
          <Flex fontWeight={"bold"}>Boost</Flex>
          <Flex opacity={0.6} fontSize={12}>
            🚀x{boost_factor}
          </Flex>
        </Flex>
      </HStack>
    </Flex>
  );
};
export const Milestones: React.FC = () => {
  const { data: profile } = useProfile();
  const { data } = useMilestones();
  console.log(data, profile);

  return (
    <CustomScrollbarWrapper>
      <Container maxW={"100%"}>
        <Flex maxW={"500px"} mx="auto" direction={"column"}>
          <Flex py={5} fontSize={20} fontWeight={"bold"}>
            Milstones
          </Flex>
          <VStack w="100%" gap={4}>
            {Object.values(data ?? {}).map((item) => {
              if (!item) return null;
              return (
                <MileStoneCard
                  isActive={
                    item?.title?.toLowerCase() ===
                    profile?.milestone?.title?.toLowerCase()
                  }
                  key={item.title.toLowerCase()}
                  {...item}
                />
              );
            })}
          </VStack>
        </Flex>
      </Container>
    </CustomScrollbarWrapper>
  );
};
