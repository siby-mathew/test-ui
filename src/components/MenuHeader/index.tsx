import { chakra, Flex, Icon, Image, useColorModeValue } from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { MenuConfig } from "src/types";
import SolmailLogoText from "@assets/logo.light.text.svg";
import SomailLogoTextDark from "@assets/logo.darker.text.svg";
import { BiSolidDownArrow } from "react-icons/bi";
import { useUsernamePopup } from "@hooks/useUsernamePopup";
import { Link } from "@tanstack/react-router";

export const MenuHeader: React.FC<MenuConfig> = ({ name, header }) => {
  const { wallet } = usePrivyWallet();
  const { username, displayName } = useGetLinkedUsernameById(wallet?.address);
  const { onUpdate } = useUsernamePopup();
  const logo = useColorModeValue(SomailLogoTextDark, SolmailLogoText);
  return (
    <Flex direction={"column"}>
      <Flex fontWeight={"bold"} fontSize={18} px={1}>
        <Link to={"/"}>
          <Image
            h="18px"
            data-block={name}
            src={logo}
            alt="Solmail"
            position={"relative"}
            left={"-3px"}
          />
        </Link>
      </Flex>
      {username && displayName && (
        <Flex
          mt={1}
          onClick={() =>
            onUpdate({
              requestUsernameLink: !0,
            })
          }
          w="100%"
          overflow={"hidden"}
        >
          <chakra.span
            fontSize={13}
            display={"inline-flex"}
            opacity={0.8}
            cursor={"pointer"}
            w="90%"
            _hover={{
              opacity: 0.7,
            }}
            color="solana.end"
            position={"relative"}
          >
            <chakra.span
              whiteSpace={"nowrap"}
              maxW={"80%"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              position={"relative"}
              paddingRight={"14px"}
              display={"inline-flex"}
              alignItems={"center"}
            >
              {displayName}
              <chakra.span position={"absolute"} right={0} my="auto" bottom={0}>
                <Icon ml={2} fontSize={9} as={BiSolidDownArrow} />
              </chakra.span>
            </chakra.span>
          </chakra.span>
        </Flex>
      )}
      {header && (
        <Flex mt={2} py={2}>
          {header()}
        </Flex>
      )}
    </Flex>
  );
};
