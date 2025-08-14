import { Container, Flex } from "@chakra-ui/react";
import IDL from "@integrations/idl/solmail/solmail.json";
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
      </Flex>
    </Container>
  );
};
