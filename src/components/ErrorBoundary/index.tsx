import { Flex, Image } from "@chakra-ui/react";
import Piegion from "@assets/piegion.png";
export const ErrorBoundaryPage: React.FC = () => {
  return (
    <Flex w="100%">
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        maxW={400}
        h="100%"
        mx="auto"
        minH="100vh"
      >
        <Flex>
          <Image borderRadius={"50%"} w="100px" src={Piegion} />
        </Flex>
        <Flex fontWeight={"medium"} fontSize={18} my={2}>
          Oops! Something went wrong.
        </Flex>
        <Flex textAlign={"center"} opacity={0.6}>
          Don't worry, our team has been notified. Please try refreshing the
          page or coming back later
        </Flex>
      </Flex>
    </Flex>
  );
};
