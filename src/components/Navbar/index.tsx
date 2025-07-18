import { Flex } from "@chakra-ui/react";
import { SolBalance } from "@components/SolBalance";
import { UserProfileCard } from "@components/UserProfile";

export const Navbar: React.FC = () => {
  return (
    <Flex
      w="100%"
      direction={"row"}
      px={5}
      py={3}
      gap={2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex></Flex>
      <Flex gap={3}>
        <SolBalance />
        <UserProfileCard />
      </Flex>
    </Flex>
  );
};
