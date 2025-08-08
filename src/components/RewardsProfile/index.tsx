import { Badge, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FaShareAlt } from "react-icons/fa";

import { useProfile } from "@hooks/useProfile";
import { ShareReferralCode } from "@components/ShareReferralCode";
import { Link } from "@tanstack/react-router";

export const RewardsProfile: React.FC = () => {
  const { data } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditMode,
    onOpen: enableEditMode,
    onClose: disableEditMode,
  } = useDisclosure();
  return (
    <Flex
      direction="column"
      align="center"
      p={5}
      bg="surface.600"
      borderRadius={15}
      py={16}
    >
      <Flex
        boxSize={"90px"}
        bg="surface.900"
        borderRadius={"50%"}
        alignItems={"center"}
        justifyContent={"center"}
        fontSize={40}
        userSelect={"none"}
      >
        {data?.milestone.icon}
      </Flex>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        as={Link}
        to="/u/rewards/milestones"
        my={2}
      >
        {data?.milestone.title}
      </Text>
      <Badge mt={2} colorScheme="green" px="8px" py="2px" borderRadius={15}>
        Boost 🚀 x{data?.milestone?.boost_factor}
      </Badge>
      <Button
        onClick={() => {
          enableEditMode();
          onOpen();
        }}
        borderRadius={20}
        mt={4}
        variant="ghost"
        w="full"
      >
        Edit Referral
      </Button>
      <Button
        mt={2}
        leftIcon={<FaShareAlt />}
        borderRadius={20}
        variant={"green"}
        w="full"
        onClick={() => {
          disableEditMode();
          onOpen();
        }}
      >
        Share Referral
        <ShareReferralCode
          isEditMode={isEditMode}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Button>
    </Flex>
  );
};
