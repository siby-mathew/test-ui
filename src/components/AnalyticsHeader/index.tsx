import { chakra, Flex } from "@chakra-ui/react";
import { useProfile } from "@hooks/useProfile";
import { useEffect, useState } from "react";

export const AnalyticsHeader: React.FC = () => {
  const { data } = useProfile();
  const [progress, set] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data && data.xp && data.xp.amount) {
        set(
          Math.min(100, (data.xp.amount / (data?.milestone.maximum + 1)) * 100)
        );
      }
    }, 1500);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data]);

  return (
    <Flex w="100%" direction={"column"} px={5}>
      <Flex>
        🔥<chakra.span opacity={0.5}> Points Earned</chakra.span>
      </Flex>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Flex fontWeight={"bold"} fontSize={20}>
          {data?.xp?.amount}XP
        </Flex>
        <Flex
          color={"green.500"}
          alignItems={"flex-end"}
          justifyContent={"flex-end"}
          h="100%"
        >
          {data?.milestone?.boost_factor}x Boost 🚀
        </Flex>
      </Flex>
      <Flex w="100%" my={2}>
        <Flex
          bg="solana"
          h={"20px"}
          flex={"auto"}
          w={`${progress}%`}
          borderRadius={15}
          transition={"all ease .5s"}
        />
        <Flex
          w={`${100 - progress}%`}
          h="20px"
          flex={"auto"}
          backgroundImage={`repeating-linear-gradient(
      -45deg,
      #2b2b2bff,
      #2b2b2bff 4px,
      transparent 4px,
      transparent 10px
    )`}
          borderRadius={15}
        />
      </Flex>
      <Flex fontSize={13} opacity={0.5} mt={1}>
        Invite 7 more friends to reach level Crab 🦀 and 2x Boost 🚀
      </Flex>
    </Flex>
  );
};
