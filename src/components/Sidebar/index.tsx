import {
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Image,
  VStack,
  Menu,
  MenuList,
  MenuButton,
  chakra,
  Link as ChakraLink,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { config } from "@const/config";
import { MENU } from "@const/menu";
import { Link, useLocation } from "@tanstack/react-router";
import { BsPlusCircleFill } from "react-icons/bs";

import { MdKeyboardArrowDown } from "react-icons/md";
import { isActive } from "@utils/index";
import type { MenuConfig } from "src/types";

import JupiterLogo from "@assets/jupiter.svg";

import { LINKS } from "@const/links";
import { ClipboardText } from "@components/ClipboardText";
import { getSolscanAddress } from "@utils/string/getSolscanUrl";
import { useMemo } from "react";
import { MenuHeader } from "@components/MenuHeader";
import { noop } from "lodash";
import { ClaimUserName } from "@components/ClaimUsername";
import { DOMAINS } from "@const/domain";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { usePrivyWallet } from "@hooks/usePrivyWallet";

export const AppSwitch: React.FC = () => {
  return (
    <Box w="100%">
      <Menu>
        <Flex as={MenuButton} w="100%" data-group>
          <Flex
            px={2}
            py={2}
            direction={"row"}
            border={"solid 1px"}
            w="100%"
            borderRadius={"15px"}
            alignItems={"center"}
            borderColor={"surface.400"}
            cursor={"pointer"}
            position={"relative"}
            pr="30px"
            bg="surface.100"
            transition={"all ease .2s"}
            _groupHover={{
              bg: "surface.300",
            }}
          >
            <Flex>
              <Image boxSize={"30px"} src={config.logo} alt="Solmail" />
            </Flex>
            <Flex px={3} bg="solana" bgClip={"text"} fontWeight={"bold"}>
              Solmail
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              position={"absolute"}
              right={0}
              top={0}
              bottom={0}
              w="30px"
            >
              <Icon as={MdKeyboardArrowDown} />
            </Flex>
          </Flex>
        </Flex>
        <MenuList
          backdropFilter={"blur(2px)"}
          w="full"
          borderColor={"surface.300"}
          bg="rgba(28, 28, 28, 0.9)"
          p={5}
        >
          <Box w="215px">Menu for switching apps</Box>
        </MenuList>
      </Menu>
    </Box>
  );
};

export const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const selectedmenu = useMemo(() => {
    const menu = MENU.find((menu) => pathname.indexOf(menu.id) > -1);
    return menu || MENU[0];
  }, [pathname]);
  const { wallet } = usePrivyWallet();
  const { username, isLoading, hasUserNames, isFetched } =
    useGetLinkedUsernameById(wallet?.address);
  const hasChildMenu =
    selectedmenu && selectedmenu.submenu && selectedmenu.submenu.length > 0;

  return (
    <Flex
      w={{
        base: "50px",
        ...(hasChildMenu ? { md: "300px" } : {}),
      }}
      maxW={{
        base: "50px",
        ...(hasChildMenu ? { md: "300px" } : {}),
      }}
      direction={"row"}
      data-group
      bg="surface.100"
    >
      <Flex
        w={{
          base: "50px",
        }}
        direction={"column"}
        bg="surface.400"
      >
        <VStack align={"center"} px={"8px"} py={"10px"}>
          <Flex my={"8px"}>
            <Link to={"/"}>
              <Image src={config.logo} w="28px" />
            </Link>
          </Flex>
          {MENU.map((menu) => {
            if (menu.skipRender) {
              return null;
            }
            const active = isActive(menu.id, pathname);
            return (
              <Flex key={menu.id}>
                <Tooltip
                  label={menu.name}
                  bg={"surface.100"}
                  color={"light.100"}
                >
                  <ChakraLink
                    color={active ? "solana.middle" : ""}
                    as={Link}
                    py={2}
                    to={menu.link}
                  >
                    <Icon fontSize={19} as={menu.icon} />
                  </ChakraLink>
                </Tooltip>
              </Flex>
            );
          })}
        </VStack>
      </Flex>
      <Flex
        hidden={!hasChildMenu}
        direction={"column"}
        p={5}
        pb={3}
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <MenuHeader {...selectedmenu} />
        <Flex direction={"column"} flex={"auto"}>
          <VStack align={"start"} gap={1} my={3} mt={0} w="100%">
            {selectedmenu?.submenu?.map((menu) => {
              return <SidebarMenu key={menu.id} {...menu} />;
            })}
          </VStack>
          {isFetched && !hasUserNames && !username && !isLoading && (
            <Flex
              align={"start"}
              borderTop={"solid 1px"}
              borderTopColor={"surface.300"}
              py={3}
              px={3}
              direction={"column"}
            >
              <Flex direction={"column"}>
                <Flex fontSize={14} opacity={0.5}>
                  Create username
                </Flex>
                <Flex
                  cursor={"pointer"}
                  alignItems={"center"}
                  mb={5}
                  transition={"all ease .2s"}
                  _hover={{
                    opacity: 0.5,
                  }}
                  onClick={onOpen}
                  fontWeight={"bold"}
                  color={"solana.middle"}
                >
                  <ClaimUserName isOpen={isOpen} onClose={onClose} />
                  {DOMAINS.DEFAULT}
                  <Icon fontSize={12} ml={2} as={BsPlusCircleFill} />
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
        <SidebarFooter />
      </Flex>
    </Flex>
  );
};

const SidebarFooter: React.FC = () => {
  return (
    <Flex
      direction={"column"}
      borderTop={"solid 1px"}
      pt={3}
      borderTopColor={"surface.300"}
    >
      <Flex alignItems={"center"} fontSize={13} gap={2}>
        <ChakraLink
          as={Link}
          to={getSolscanAddress(config.SOLMAIL_CONTRACT, "mainnet")}
          display={"inline-flex"}
          alignItems={"center"}
          target="_blank"
        >
          <Image boxSize={"13px"} mr={1} src={config.logo} />
          <chakra.span textDecoration={"underline"}>Solmail</chakra.span>
        </ChakraLink>
        <chakra.span>
          <ClipboardText>{config.SOLMAIL_CONTRACT}</ClipboardText>
        </chakra.span>
        <chakra.span>
          <ChakraLink href={LINKS.jupiter} target="_blank">
            <Image boxSize={"13px"} borderRadius={"50%"} src={JupiterLogo} />
          </ChakraLink>
        </chakra.span>
      </Flex>
      <Flex mt={1} opacity={0.7} fontSize={12}>
        Solmail © 2025 All rights reserved.
      </Flex>
    </Flex>
  );
};

const SidebarMenu: React.FC<MenuConfig> = ({
  name,
  link,
  icon,
  id,
  onClick,
}) => {
  const { pathname } = useLocation();
  const _isActive = isActive(id, pathname);
  return (
    <LinkBox
      bg={_isActive ? "surface.300" : ""}
      w="100%"
      borderRadius={10}
      display={"flex"}
      alignItems={"center"}
      px={3}
      py={"10px"}
      transition={"all ease .5s"}
      onClick={onClick || noop}
      _hover={{
        bg: !_isActive ? "surface.200" : "",
      }}
    >
      <Icon as={icon} mr={2} color={_isActive ? "solana.middle" : ""} />
      <Box as="span" color={_isActive ? "solana.middle" : ""}>
        {name}
      </Box>
      <LinkOverlay as={Link} to={link} />
    </LinkBox>
  );
};
