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
        <chakra.span
          bg="solana"
          bgClip={"text"}
          fontWeight={"bold"}
          fontSize={30}
        >
          Solsign
        </chakra.span>
      </Flex>

      <Flex>We’re working on something awesome. Stay tuned!</Flex>
    </Flex>
  );
};
