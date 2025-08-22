import { Button, Flex, Link as ChakraLink } from "@chakra-ui/react";

import { usePrivy } from "@privy-io/react-auth";

import { SocialShare } from "@components/SocialShare";
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
            size={"lg"}
            borderRadius={"25px"}
            variant={"solana"}
          >
            Connect Wallet
          </Button>
        </Flex>
      </Flex>
      <Flex direction={"column"} alignItems={"center"} w="100%">
        <SocialShare />
      </Flex>
      <Flex
        alignItems={"center"}
        gap={5}
        fontSize={13}
        justifyContent={"center"}
        opacity={0.5}
      >
        <Flex>Solmail © {new Date().getFullYear()}</Flex>
        <Flex>
          <ChakraLink
            href="https://elastic-grip-d07.notion.site/Terms-and-conditions-25750f9ac7168058b39ded4c2316ec37"
            target="_blank"
          >
            Terms & Conditions
          </ChakraLink>
        </Flex>
        <Flex>
          <ChakraLink
            href="https://elastic-grip-d07.notion.site/Privacy-Policy-25750f9ac71680129ef5e99dc1ac860f"
            target="_blank"
          >
            Privacy policy
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
