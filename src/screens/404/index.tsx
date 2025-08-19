import { chakra, Flex, Image } from "@chakra-ui/react";
import Piegion from "@assets/piegion.png";
export const PageNotFound: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      w="100%"
      h="100%"
    >
      <Flex my={5}>
        <Image w={100} borderRadius={"50%"} src={Piegion} />
      </Flex>
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
