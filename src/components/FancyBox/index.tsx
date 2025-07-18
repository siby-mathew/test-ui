import { Flex, Icon, Spinner } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useComposer } from "@hooks/useComposer";

import { IoSend } from "react-icons/io5";

// Define the keyframes using Chakra's `keyframes` utility
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const animation = `${gradientAnimation} 3s ease infinite`;
export const FancyBox: React.FC = () => {
  const { composerState } = useComposer();
  return (
    <Flex
      bgGradient="linear(275deg, solana.start ,solana.middle, solana.end )"
      backgroundSize="180% 180%"
      animation={animation}
      w="100%"
      borderTopRadius={10}
      color={"#ffffffff"}
    >
      <Flex
        direction={"row"}
        py={2}
        px={5}
        pl={"40px"}
        position={"relative"}
        w="100%"
        userSelect={"none"}
        cursor={"pointer"}
      >
        <Flex
          alignItems={"center"}
          pr={4}
          position={"absolute"}
          top={0}
          bottom={0}
        >
          <Spinner color="#ffffffff" />
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          w="100%"
        >
          <Flex fontWeight={"bold"} alignItems={"center"} fontSize={16}>
            Sending Solmail
            <Icon as={IoSend} ml={2} />
          </Flex>
          <Flex opacity={0.7} fontWeight={"medium"}>
            {composerState}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
