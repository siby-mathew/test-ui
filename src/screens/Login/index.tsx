import { Button, Flex, Icon } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { FaXTwitter } from "react-icons/fa6";
import { SiTelegram } from "react-icons/si";

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
        <Flex bg="solana" bgClip={"text"} fontSize={23}>
          Don't email it. SolMail it.
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
        <Flex>Solmail © 2025</Flex>
        <Flex>Terms & Conditions</Flex>
        <Flex>Privacy policy</Flex>
        <Flex>FAQ</Flex>

        <Flex>
          <Icon as={FaXTwitter} />
        </Flex>
        <Flex>
          <Icon as={SiTelegram} />
        </Flex>
      </Flex>
    </Flex>
  );
};
