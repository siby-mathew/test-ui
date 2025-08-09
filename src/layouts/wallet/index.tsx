import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useBalance } from "@hooks/useBalance";
import { IconType } from "react-icons";
import { LuQrCode } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import { ShareAddress } from "@components/ShareAddress";
import { Link, Outlet } from "@tanstack/react-router";
import { isFunction } from "lodash";
const MenuButton: React.FC<{
  name: string;
  icon: IconType;
  link?: string;
  onClick?: () => void;
}> = ({ name, icon, onClick, link }) => {
  const onClickHandler = () => {
    if (isFunction(onClick)) {
      onClick();
    }
  };
  return (
    <Flex
      direction={"column"}
      boxSize={"70px"}
      bg="surface.600"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={5}
      fontSize={13}
      transition={"all ease .2s"}
      onClick={onClickHandler}
      position={"relative"}
      _hover={{
        bg: "surface.700",
      }}
      cursor={"pointer"}
      as={LinkBox}
    >
      <Flex my={2} color={"green.500"}>
        <Icon fontSize={25} as={icon} />
      </Flex>
      <Flex>{name}</Flex>
      {link && <LinkOverlay as={Link} to={link} />}
    </Flex>
  );
};
export const WalletLayout: React.FC = () => {
  const { formattedBalance } = useBalance();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container>
      <ShareAddress isOpen={isOpen} onClose={onClose} />
      <Box w="100%" py={5} textAlign={"center"}>
        <chakra.span fontWeight={"medium"} fontSize={25}>
          {formattedBalance}
        </chakra.span>
      </Box>
      <Box w="100%">
        <HStack align={"center"} justifyContent={"center"}>
          <MenuButton name="Receive" icon={LuQrCode} onClick={onOpen} />
          <MenuButton name="Pay" icon={FiArrowUpRight} link="/u/wallet/pay" />
        </HStack>
      </Box>
      <Box p={5}>
        <Outlet />
      </Box>
    </Container>
  );
};
