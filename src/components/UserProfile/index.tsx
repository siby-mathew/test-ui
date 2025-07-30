import { Button, Flex, Icon, Image } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";

import GmailLogo from "@assets/gmail.png";

import { MdOutlineArrowDropDown } from "react-icons/md";
import { useMemo } from "react";
import { useGetWalletById } from "@hooks/useGetWalletById";
import { shortenPrincipalId, trim } from "@utils/string";
import { ClipboardText } from "@components/ClipboardText";

import { RiShutDownLine } from "react-icons/ri";

import { useSessionHandler } from "@hooks/useSessionHandler";
export const UserProfileCard: React.FC = () => {
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
    <Flex
      borderRadius={10}
      border={"solid 1px"}
      borderColor={"surface.500"}
      alignItems={"center"}
      position={"relative"}
      p={"8px"}
      px={"10px"}
      direction={"row"}
      gap={1}
      cursor={"pointer"}
      transition={"all ease .2s"}
      data-group
      _hover={{
        bg: "surface.400",
      }}
    >
      <Flex boxSize={"20px"} borderRadius={8}>
        <Image src={icon} alt="Gmail" />
      </Flex>
      <Flex fontSize={14}>
        {isWallet ? shortenPrincipalId(displayName) : trim(displayName)}
      </Flex>
      <Flex>
        <Icon as={MdOutlineArrowDropDown} />
      </Flex>
      <Flex
        position={"absolute"}
        top={"100%"}
        right={0}
        w="300px"
        display={"none"}
        zIndex={100}
        _groupHover={{
          display: "flex",
        }}
      >
        <Profile name={displayName} isWallet={isWallet} />
      </Flex>
    </Flex>
  );
};

const Profile: React.FC<{ name: string; isWallet: boolean }> = ({
  name,
  isWallet,
}) => {
  const { onLogout, isPending } = useSessionHandler();
  const { user } = usePrivy();
  return (
    <Flex
      mt={2}
      bg="surface.400"
      borderRadius={10}
      minH={100}
      w="100%"
      cursor={"default"}
      p={3}
      py={4}
      direction={"column"}
      data-id={user?.id?.toString()}
    >
      <Flex direction={"column"} alignItems={"center"}>
        <Flex fontWeight={"medium"}>
          Connected with {isWallet ? "wallet" : "email"}
        </Flex>
        <Flex opacity={0.5} fontSize={13}>
          <ClipboardText trim={isWallet}>{name}</ClipboardText>
        </Flex>
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
  );
};
