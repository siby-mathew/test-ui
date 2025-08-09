import { Container, Flex } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

export const WalletPage: React.FC = () => {
  return (
    <Container maxW={"100%"}>
      Here is my page Header
      <Flex>
        <Outlet />
      </Flex>
    </Container>
  );
};
