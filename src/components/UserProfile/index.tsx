import {
  Button,
  chakra,
  Divider,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

import { shortenPrincipalId } from "@utils/string";
import { ClipboardText } from "@components/ClipboardText";

import { RiShutDownLine } from "react-icons/ri";

import { useSessionHandler } from "@hooks/useSessionHandler";

import { usePrivyWallet } from "@hooks/usePrivyWallet";

import { IoInformationCircleSharp } from "react-icons/io5";

import { SolBalance } from "@components/SolBalance";
import { Link as TanstackRouter } from "@tanstack/react-router";
import { useGetWalletById } from "@hooks/useGetWalletById";
import { useMemo } from "react";
import GmailLogo from "@assets/gmail.png";
import { ShareAddress } from "@components/ShareAddress";
import { useBalance } from "@hooks/useBalance";
import { LuWalletMinimal } from "react-icons/lu";

import { useMyUsername } from "@hooks/useMyUsername";
import { IoIosArrowDown } from "react-icons/io";
export const UserProfileCard: React.FC = () => {
  const { formattedBalance } = useBalance();
  const { username, address } = useMyUsername();
  return (
    <Flex direction={"row"} alignItems={"center"} gap={3}>
      <Flex
        bg="rgba(255,255,255,.1)"
        alignItems={"center"}
        gap={1}
        px={3}
        py={"8px"}
        borderRadius={4}
      >
        <chakra.span alignItems={"center"} display={"inline-flex"}>
          <Icon as={LuWalletMinimal} fontSize={18} />
        </chakra.span>

        <chakra.span fontSize={14} fontWeight={"medium"}>
          {formattedBalance}
        </chakra.span>
      </Flex>
      <Flex w={"1px"} h="100%" py={"3px"}>
        <Flex h="100%" bg="light.500" w="100%" opacity={0.3} />
      </Flex>
      <Flex>
        <Menu>
          <MenuButton
            display={"inline-flex"}
            as={Button}
            bg="transparent !important"
            rightIcon={<IoIosArrowDown />}
            lineHeight={"initial"}
            fontWeight={"normal"}
            fontSize={14}
            px={0}
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 20,
            }}
          >
            <Flex direction={"column"} gap={0}>
              {username && (
                <Flex fontWeight={"medium"} maxW={"100px"}>
                  <chakra.span
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {username}
                  </chakra.span>
                </Flex>
              )}
              <Flex opacity={0.5}>{shortenPrincipalId(address)}</Flex>
            </Flex>
          </MenuButton>

          <MenuList bg={"transparent"} border={"none"} p={0}>
            <Profile />
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

const Profile: React.FC = () => {
  const { user } = usePrivy();

  return (
    <Flex
      mt={2}
      bg="surface.800"
      borderRadius={10}
      minH={100}
      cursor={"default"}
      p={3}
      py={4}
      direction={"column"}
      data-id={user?.id?.toString()}
      w="300px"
    >
      <ProfileHeader />
      <Divider my={3} opacity={0.3} />
      <ProfileBalance />
      <Divider my={3} opacity={0.3} />
      <ProfileMenu />
    </Flex>
  );
};

const ProfileHeader: React.FC = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} direction={"row"}>
      <chakra.span> Solmail inbox account</chakra.span>
      <Menu placement="auto">
        {({ isOpen }) => {
          return (
            <>
              <MenuButton
                mx={2}
                as={Flex}
                cursor={"pointer"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={"5px"}
              >
                <Icon as={IoInformationCircleSharp} />
              </MenuButton>
              {isOpen && (
                <MenuList bg="surface.900" p={3} border={"none"}>
                  <Flex w="300px" fontSize={12}>
                    Your SolMail InBox account is non-custodial wallet powered
                    by Privy, with the option to export your private key.
                  </Flex>
                </MenuList>
              )}
            </>
          );
        }}
      </Menu>
    </Flex>
  );
};

const ProfileBalance: React.FC = () => {
  const { wallet } = usePrivyWallet();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex direction={"column"} my={3}>
      <ShareAddress isOpen={isOpen} onClose={onClose} />
      <Flex
        fontSize={15}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SolBalance />
      </Flex>
      <Flex alignItems={"center"} justifyContent={"center"} my={2}>
        <Button onClick={onOpen}>Deposit</Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <ClipboardText textToCopy={wallet?.address ?? ""}>
          {shortenPrincipalId(wallet?.address ?? "")}
        </ClipboardText>
      </Flex>
    </Flex>
  );
};

const ProfileMenu: React.FC = () => {
  const { onLogout, isPending } = useSessionHandler();
  return (
    <VStack>
      <Link as={TanstackRouter} to="">
        Manage Account
      </Link>

      <Flex
        direction={"column"}
        bg="surface.400"
        w="100%"
        p={3}
        borderRadius={15}
        pb={4}
        mt={2}
      >
        <Flex alignItems={"center"} justifyContent={"center"}>
          <LoginInfo />
        </Flex>
        <Flex pt={5} justifyContent={"center"}>
          <Button
            bg="red.500"
            _hover={{
              bg: "red.600",
            }}
            onClick={onLogout}
            leftIcon={<RiShutDownLine />}
          >
            Disconnect{isPending ? "ing..." : ""}
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
};

export const LoginInfo: React.FC = () => {
  const { user } = usePrivy();

  const { get } = useGetWalletById();
  const { isWallet, displayName, icon } = useMemo(() => {
    const account = user?.linkedAccounts[0] as any;
    if (!account || !account.address) {
      return {
        displayName: "",
        icon: "",
        isWallet: !1,
      };
    }
    const displayName = account?.address;
    const isWallet = account.type !== "email";
    return {
      displayName,
      icon: !isWallet ? GmailLogo : (get(displayName)?.meta.icon ?? ""),
      isWallet,
    };
  }, [get, user?.linkedAccounts]);
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Flex fontWeight={"bold"}>Logged in via</Flex>
      <Flex direction={"row"} gap={1} mt={"3px"} alignItems={"center"}>
        <Flex>
          <Image boxSize={"16px"} src={icon} />
        </Flex>
        <Flex fontSize={13}>
          {isWallet ? shortenPrincipalId(displayName) : displayName}
        </Flex>
      </Flex>
    </Flex>
  );
};
