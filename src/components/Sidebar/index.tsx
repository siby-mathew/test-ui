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
  useClipboard,
} from "@chakra-ui/react";
import { config } from "@const/config";
import { SOLMAIL_MENU } from "@const/menu";
import { Link } from "@tanstack/react-router";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";
import { LiaWalletSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import { shortenPrincipalId } from "@utils/index";
import type { MenuConfig } from "src/@types";
import PrivyLogo from "@assets/privy.jpg";
import JupiterLogo from "@assets/jupiter.svg";
import { TbCopyCheckFilled } from "react-icons/tb";

import { useSolanaWallets } from "@privy-io/react-auth";

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
            <Icon as={LiaWalletSolid} mr={2} /> Wallet
          </Flex>

          <VStack py={2} align={"start"} w="full">
            <WalletList />
          </VStack>
        </Flex>
      </Flex>
      <SidebarFooter />
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
            {shortenPrincipalId(config.SOLMAIL_CONTRACT)}{" "}
            <Icon fontSize={13} as={FaCopy} ml={2} />
          </ChakraLink>
        </chakra.span>
        <chakra.span>
          <Image boxSize={"13px"} borderRadius={"50%"} src={JupiterLogo} />
        </chakra.span>
      </Flex>
      <Flex mt={1} opacity={0.7} fontSize={12}>
        Solmail © 2025 All rights reserved.
      </Flex>
    </Flex>
  );
};

const WalletList: React.FC = () => {
  const { wallets, exportWallet } = useSolanaWallets();
  return (
    <>
      {wallets &&
        wallets.length > 0 &&
        wallets.map((wallet) => {
          const isSolanaEmbedded =
            wallet.type === "solana" && wallet.walletClientType === "privy";

          return (
            <Wallet
              name={wallet.meta.name}
              address={wallet.address?.toString()}
              onExport={isSolanaEmbedded ? exportWallet : undefined}
              logo={!isSolanaEmbedded ? (wallet.meta.icon ?? "") : PrivyLogo}
            />
          );
        })}
    </>
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
  const { onCopy, hasCopied } = useClipboard(address ?? "");
  return (
    <Flex
      direction={"row"}
      py={1}
      position={"relative"}
      w="100%"
      cursor={"pointer"}
      transition={"all ease .2s"}
      _hover={{
        opacity: 0.8,
      }}
    >
      <Flex fontSize={13} w="100%" alignItems={"center"}>
        <Image boxSize={"18px"} borderRadius={5} src={logo} alt={name} />
        <chakra.span mx={2}>{shortenPrincipalId(address)}</chakra.span>
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
              <Icon fontSize={12} as={BsArrowUpRightSquareFill} />
            </Box>
          )}
          <Box
            p={1}
            opacity={0.2}
            onClick={onCopy}
            _hover={{
              opacity: 1,
            }}
          >
            <Icon as={hasCopied ? TbCopyCheckFilled : FaCopy} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
