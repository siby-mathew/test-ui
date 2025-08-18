import { Container, Flex, Link as ChakraLink, Icon } from "@chakra-ui/react";
import IDL from "@integrations/idl/solmail/solmail.json";
import { Link } from "@tanstack/react-router";
import { TbExternalLink } from "react-icons/tb";
export const Status: React.FC = () => {
  return (
    <Container py={15}>
      <Flex direction={"column"}>
        <Flex fontWeight={"bold"}>Cluster</Flex>
        <Flex>{import.meta.env.VITE_SOLMAIL_CLUSTER}</Flex>
        <Flex mt={5} fontWeight={"bold"}>
          Mail program ID
        </Flex>
        <Flex>{IDL.address}</Flex>
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
