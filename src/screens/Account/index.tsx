import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  VStack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSessionHandler } from "@hooks/useSessionHandler";
import { Link as TansatackLink } from "@tanstack/react-router";
import { ReactNode } from "react";
import { PiExport } from "react-icons/pi";
import { RiShutDownLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import MailDotFunLogo from "@assets/mail.fun.svg";
import { HiOutlineExternalLink } from "react-icons/hi";
import { usePrivy } from "@privy-io/react-auth";

import { ClipboardText } from "@components/ClipboardText";
import { UsernameLinkBox } from "@components/LinkUsername";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { shortenPrincipalId } from "@utils/string";
import { ClaimUserName } from "@components/ClaimUsername";

const ExportKeySettings: React.FC = () => {
  const { exportWallet } = usePrivyWallet();
  return (
    <Flex w="100%" direction={"column"}>
      <Setting
        info="Never share your private key or seed phrase with anyone."
        title="Private key"
      >
        <Button rightIcon={<PiExport />} onClick={exportWallet} size={"sm"}>
          Export
        </Button>
      </Setting>
    </Flex>
  );
};

export const UsernameSwitch: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const { address } = usePrivyWallet();
  const { displayName, isWalletAddress, hasUserNames } =
    useGetLinkedUsernameById(address);

  return (
    <Flex w="100%" direction={"column"}>
      {!hasUserNames && <ClaimUserName isOpen={isOpen} onClose={onClose} />}

      <Flex w="100%" direction={"column"}>
        <Setting
          title="Username"
          info="You can add multiple Usernames to your Mailbox, all have the same Wallet address, but you can operate with different names"
        >
          {!hasUserNames && (
            <Button onClick={onOpen} size={"sm"} rightIcon={<TbEdit />}>
              {isWalletAddress ? shortenPrincipalId(displayName) : displayName}
            </Button>
          )}
        </Setting>

        {hasUserNames && (
          <Flex bg="surface.500" p={5} borderRadius={5} my={5}>
            <UsernameLinkBox />
          </Flex>
        )}
      </Flex>
      <Flex mb={3} opacity={0.6} fontSize={13}>
        Discover, bid and claim your unique identity in
      </Flex>
      <Flex gap={2}>
        <Link
          as={TansatackLink}
          to={import.meta.env.VITE_SOLMAIL_MAIL_DOT_FUN}
          border={"solid 1px"}
          p={"5px"}
          px={3}
          borderColor={"surface.900"}
          borderRadius={10}
          bg="surface.900"
          target="_blank"
          display={"inline-flex"}
          alignItems={"center"}
          _hover={{
            bg: "surface.600",
          }}
        >
          <Image src={MailDotFunLogo} />
          <Icon ml={2} as={HiOutlineExternalLink} />
        </Link>
      </Flex>
    </Flex>
  );
};

const SessionHandler: React.FC = () => {
  const { onLogout, isPending } = useSessionHandler();
  return (
    <Flex
      w="100%"
      py={5}
      borderTop={"solid 1px"}
      borderTopColor={"surface.600"}
    >
      <Button
        bg="red.500"
        _hover={{
          bg: "red.600",
        }}
        w="100%"
        onClick={onLogout}
      >
        <Icon as={RiShutDownLine} mr={2} />
        {`Disconnect${isPending ? "ing.." : ""}`}
      </Button>
    </Flex>
  );
};

export const LinkedAccounts: React.FC = () => {
  const { user } = usePrivy();

  return (
    <Flex w="100%" direction={"column"}>
      <Setting
        title="Linked Accounts"
        info="All linked to one account for seamless, consistent access."
      ></Setting>
      <VStack mt={5} bg="surface.600" p={5} borderRadius={10}>
        {user?.linkedAccounts?.map((account: any) => {
          return (
            <Flex
              w="100%"
              direction={"row"}
              alignItems={"center"}
              gap={2}
              fontSize={13}
            >
              <Flex direction={"column"}>
                <ClipboardText trim={!1}>
                  {account.address ?? account?.email}
                </ClipboardText>
                <Flex fontSize={12} opacity={0.5}>
                  {account.walletClientType ?? account.type}
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </VStack>
    </Flex>
  );
};
export const AccountPage: React.FC = () => {
  return (
    <Container maxW={"100%"}>
      <Box maxW={500} mx="auto">
        <Box
          py={4}
          fontWeight={"bold"}
          borderBottom={"solid 1px"}
          borderBottomColor={"surface.600"}
          fontSize={18}
        >
          Account settings
        </Box>
        <VStack py={5} gap={6}>
          <ExportKeySettings />
          <UsernameSwitch />

          <SessionHandler />
        </VStack>
      </Box>
    </Container>
  );
};

const Setting: React.FC<{
  title: string;
  info?: string;
  children?: ReactNode;
}> = ({ children, title, info }) => {
  return (
    <Flex flexDirection={"row"} gap={2} w="100%">
      <Flex direction={"column"} flex={"auto"}>
        <Flex fontWeight={"bold"}>{title}</Flex>
        {info && (
          <Flex fontSize={13} opacity={0.5}>
            {info}
          </Flex>
        )}
      </Flex>
      {children && <Flex alignItems={"center"}>{children}</Flex>}
    </Flex>
  );
};
