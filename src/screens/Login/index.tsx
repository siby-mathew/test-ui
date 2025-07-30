import {
  Button,
  Flex,
  Icon,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react";
import { LINKS } from "@const/links";
import { usePrivy } from "@privy-io/react-auth";

import { FaXTwitter } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";
import JupiterLogo from "@assets/jupiter.svg";
export const Login: React.FC = () => {
  const { login } = usePrivy();

  return (
    <Flex p={5} w="100%" direction={"column"}>
      <Flex
        flex={"auto"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex bg="solana" bgClip={"text"} fontSize={23} mb={3}>
          Inbox. Identity. Influence
        </Flex>
        <Flex my={2}>
          <Button
            onClick={login}
            _hover={{
              opacity: 0.8,
            }}
            borderRadius={"25px"}
            size={"lg"}
            bg="solana !important"
          >
            Connect Wallet
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems={"center"}
        gap={5}
        fontSize={13}
        justifyContent={"center"}
        opacity={0.5}
      >
        <Flex>Solmail © {new Date().getFullYear()}</Flex>
        {/* <Flex>
          <ChakraLink href="#">Terms & Conditions</ChakraLink>
        </Flex>
        <Flex>
          <ChakraLink href="#">Privacy policy</ChakraLink>
        </Flex>
        <Flex>
          <ChakraLink href="#">FAQ</ChakraLink>
        </Flex> */}

        <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
          <ChakraLink
            href={LINKS.twitter}
            target="_blank"
            _hover={{
              opacity: 0.5,
            }}
            alignItems={"center"}
            display={"inline-flex"}
          >
            <Icon as={FaXTwitter} />
          </ChakraLink>
          <ChakraLink
            href={LINKS.telegram}
            target="_blank"
            _hover={{
              opacity: 0.5,
            }}
            alignItems={"center"}
            display={"inline-flex"}
          >
            <Icon as={SiTelegram} />
          </ChakraLink>

          <ChakraLink
            href={LINKS.jupiter}
            target="_blank"
            _hover={{
              opacity: 0.5,
            }}
            alignItems={"center"}
            display={"inline-flex"}
          >
            <Image w="15px" src={JupiterLogo} />
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
