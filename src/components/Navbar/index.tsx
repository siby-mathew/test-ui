import { Flex } from "@chakra-ui/react";

export const Navbar: React.FC = () => {
  return (
    <Flex w="100%" direction={"row"} px={5} py={4}>
      <Flex fontWeight={"bold"} fontSize={20}>
        Inbox (5)
      </Flex>
    </Flex>
  );
};
