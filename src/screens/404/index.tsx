import { chakra, Flex } from "@chakra-ui/react";

export const PageNotFound: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w="100%"
      h="100%"
    >
      <Flex justifyContent={"center"} alignItems={"center"} w="100%">
        <chakra.span fontWeight={"bold"} fontSize={20}>
          Page not found
        </chakra.span>
      </Flex>
      <Flex opacity={0.5}>
        Oops! The page you’re looking for can’t be found.
      </Flex>
    </Flex>
  );
};
