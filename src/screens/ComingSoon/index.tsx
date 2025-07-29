import { chakra, Flex } from "@chakra-ui/react";

export const ComingSoonPage: React.FC = () => {
  return (
    <Flex
      minH={"70vh"}
      w="100%"
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Flex>
        <chakra.span fontSize={20} fontWeight={"bolder"}>
          Coming Soon
        </chakra.span>
      </Flex>
      <Flex>We’re working on something awesome. Stay tuned!</Flex>
    </Flex>
  );
};
