import { Avatar, Badge, Button, Flex, Text } from "@chakra-ui/react";
import { FaShareAlt } from "react-icons/fa";
import AvatarImage from "@assets/avatar.png";
export const RewardsProfile: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      p={5}
      bg="dark.60"
      borderRadius={15}
      py={16}
    >
      <Avatar src={AvatarImage} size="xl" mb={4} />
      <Text fontSize="2xl" fontWeight="bold">
        Shrimp 🦐
      </Text>
      <Badge mt={2} colorScheme="green" px="8px" py="2px" borderRadius={15}>
        Boost 🚀 x1
      </Badge>
      <Button borderRadius={20} mt={4} variant="ghost" w="full">
        Edit Referral
      </Button>
      <Button
        mt={2}
        leftIcon={<FaShareAlt />}
        borderRadius={20}
        variant={"green"}
        w="full"
      >
        Share Referral
      </Button>
    </Flex>
  );
};
