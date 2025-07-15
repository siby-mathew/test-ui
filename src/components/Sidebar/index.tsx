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
} from "@chakra-ui/react";
import { config } from "@const/config";
import { SOLMAIL_MENU } from "@const/menu";
import { Link } from "@tanstack/react-router";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";
import { LiaWalletSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { MenuConfig } from "src/@types";

const AppSwitch: React.FC = () => {
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
  return (
    <Flex direction={"column"} w="100%" p={5} pb={3}>
      <Flex direction={"column"} flex={"auto"}>
        <Flex>
          <AppSwitch />
        </Flex>
        <VStack align={"start"} gap={1} my={3} w="100%">
          {SOLMAIL_MENU.map((menu, index) => {
            return <SidebarMenu isActive={!index} {...menu} />;
          })}
        </VStack>
        <Flex
          align={"start"}
          borderTop={"solid 1px"}
          borderTopColor={"surface.300"}
          py={3}
          px={3}
          direction={"column"}
        >
          <Flex fontSize={14} opacity={0.5} alignItems={"center"}>
            <Icon as={LiaWalletSolid} mr={2} /> Wallets
          </Flex>

          <VStack py={2} align={"start"} w="full">
            <Wallet
              name="Privy"
              address={"C1n...RoA"}
              onExport={() => {}}
              logo="https://pbs.twimg.com/profile_images/1902346061005676544/e6WybE_v_400x400.jpg"
            />
            <Wallet
              name="Phantom"
              address={"59h...9Bi"}
              logo="https://yt3.googleusercontent.com/0yNbMsS0-rUrtVJmKd6d0xTDmLDEn1qu_KkivaeIC3UmCuXntxE-CJZRhWoy93JXij1YSJFMhA=s900-c-k-c0x00ffffff-no-rj"
            />
          </VStack>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        borderTop={"solid 1px"}
        pt={3}
        borderTopColor={"surface.300"}
      >
        <Flex alignItems={"center"} fontSize={13} gap={2}>
          <ChakraLink
            as={Link}
            to="#"
            display={"inline-flex"}
            alignItems={"center"}
            target="_blank"
          >
            <Image boxSize={"13px"} mr={1} src={config.logo} />
            <chakra.span textDecoration={"underline"}>Solmail</chakra.span>
          </ChakraLink>
          <chakra.span>
            <ChakraLink textDecoration={"underline"} to="./" as={Link}>
              C8c...z5KF <Icon fontSize={13} as={FaCopy} ml={2} />
            </ChakraLink>
          </chakra.span>
          <chakra.span>
            <Image
              boxSize={"13px"}
              borderRadius={"50%"}
              src="https://portfolio.jup.ag/icon.svg?22ee72dc09734fa6"
            />
          </chakra.span>
        </Flex>
        <Flex mt={1} opacity={0.7} fontSize={12}>
          Solmail © 2025 All rights reserved.
        </Flex>
      </Flex>
    </Flex>
  );
};

const SidebarMenu: React.FC<MenuConfig & { isActive: boolean }> = ({
  isActive,
  name,
  link,
  icon,
}) => {
  return (
    <LinkBox
      bg={isActive ? "surface.300" : ""}
      w="100%"
      borderRadius={10}
      display={"flex"}
      alignItems={"center"}
      px={3}
      py={"10px"}
      transition={"all ease .5s"}
      _hover={{
        bg: !isActive ? "surface.200" : "",
      }}
    >
      <Icon as={icon} mr={2} color={isActive ? "green.500" : ""} />
      <Box as="span" color={isActive ? "green.500" : ""}>
        {name}
      </Box>
      <LinkOverlay as={Link} to={link} />
    </LinkBox>
  );
};

type WalletProps = {
  logo: string;
  name: string;
  address: string;
  onExport?: () => void;
};

const Wallet: React.FC<WalletProps> = ({ logo, name, address, onExport }) => {
  return (
    <Flex
      direction={"row"}
      py={1}
      position={"relative"}
      w="100%"
      cursor={"pointer"}
    >
      <Flex fontSize={13} w="100%" alignItems={"center"}>
        <Image boxSize={"20px"} borderRadius={5} src={logo} alt={name} />
        <chakra.span mx={2}>{address}</chakra.span>
        <Flex flex={"auto"} justifyContent={"flex-end"} alignItems={"center"}>
          {onExport && (
            <Box
              p={1}
              onClick={onExport}
              opacity={0.2}
              _hover={{
                opacity: 1,
              }}
            >
              <Icon as={BsArrowUpRightSquareFill} />
            </Box>
          )}
          <Box
            p={1}
            opacity={0.2}
            _hover={{
              opacity: 1,
            }}
          >
            <Icon as={FaCopy} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
