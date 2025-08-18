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
import { WithSolPrice } from "@components/WithSolPrice";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { TiThListOutline } from "react-icons/ti";

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
    <Flex as={Container} maxW={"100%"} py={5} w="100%" color={"light.100"}>
      <CustomScrollbarWrapper>
        <ShareAddress isOpen={isOpen} onClose={onClose} />
        <Flex
          direction={"column"}
          alignItems={"center"}
          w="100%"
          py={5}
          textAlign={"center"}
        >
          <Flex>
            <chakra.span fontWeight={"bold"} fontSize={25}>
              {formattedBalance}
            </chakra.span>
          </Flex>
          <Flex color={"green.500"}>
            <WithSolPrice amount={formattedBalance} />
          </Flex>
        </Flex>

        <Box w="100%">
          <HStack align={"center"} justifyContent={"center"}>
            <MenuButton
              name="Overview"
              icon={TiThListOutline}
              link="/u/wallet/activity"
            />

            <MenuButton name="Receive" icon={LuQrCode} onClick={onOpen} />
            <MenuButton
              name="Send"
              icon={FiArrowUpRight}
              link="/u/wallet/pay"
            />
          </HStack>
        </Box>
        <Box p={5}>
          <Outlet />
        </Box>
      </CustomScrollbarWrapper>
    </Flex>
  );
};
