import {
  Container,
  Flex,
  Link as ChakraLink,
  Icon,
  VStack,
} from "@chakra-ui/react";
import IDL from "@integrations/idl/solmail/solmail.json";
import { Link } from "@tanstack/react-router";
import { TbExternalLink } from "react-icons/tb";

const Card: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <Flex w="100%" direction={"column"} fontSize={12}>
      <Flex mt={5} fontWeight={"bold"}>
        {label}
      </Flex>
      <Flex>{value}</Flex>
    </Flex>
  );
};
export const Status: React.FC = () => {
  return (
    <Container py={15}>
      <Flex direction={"column"}>
        <VStack>
          <Card label="Cluster" value={import.meta.env.VITE_SOLMAIL_CLUSTER} />
          <Card label="Mail program ID" value={IDL.address} />
          <Card
            label="Solmail Contract"
            value={import.meta.env.VITE_SOLMAIL_CONTRACT_ADDRESS}
          />
          <Card
            label="Pinata Gateway"
            value={import.meta.env.VITE_SOLMAIL_PINATA_BASE_URL}
          />
          <Card label="RPC" value={import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT} />
          <Card
            label="RPC API Key"
            value={import.meta.env.VITE_SOLMAIL_RPC_API_KEY}
          />
          <Card
            label="Quicknode"
            value={import.meta.env.VITE_QUICKNODE_BASE_URL}
          />
          <Card
            label="Price API"
            value={import.meta.env.VITE_SOLMAIL_PRICE_API}
          />
          <Card
            label="Sentry"
            value={import.meta.env.VITE_SOLMAIL_SENTRY_DSN}
          />

          <Card label="Rewards" value={import.meta.env.VITE_REWARDS_BACKEND} />
          <Card
            label="Backend"
            value={import.meta.env.VITE_SOLMAIL_BACKEND_API}
          />
          <Card
            label="Graphql Server"
            value={import.meta.env.VITE_SOLMAIL_GRAPHQL_ENDPOINT}
          />
        </VStack>
        <Flex my={8}>
          <ChakraLink
            alignItems={"center"}
            as={Link}
            to={"/"}
            textDecoration={"underline"}
            display={"inline-flex"}
            _hover={{
              opacity: 0.8,
            }}
          >
            Continue application <Icon ml={2} as={TbExternalLink} />
          </ChakraLink>
        </Flex>
      </Flex>
    </Container>
  );
};
