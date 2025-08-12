import { chakra, Flex, Icon, Image, useDisclosure } from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { MenuConfig } from "src/types";
import SolmailLogoText from "@assets/logo.light.text.svg";
import { BiSolidDownArrow } from "react-icons/bi";

import { LinkUserName } from "@components/LinkUsername";
export const MenuHeader: React.FC<MenuConfig> = ({ name, header }) => {
  const { wallet } = usePrivyWallet();
  const { username, displayName } = useGetLinkedUsernameById(wallet?.address);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction={"column"} mb={2}>
      <Flex fontWeight={"bold"} fontSize={18} px={1} mb={"2px"}>
        <chakra.span>
          <Image
            h="18px"
            data-block={name}
            src={SolmailLogoText}
            alt="Solmail"
            position={"relative"}
            left={"-3px"}
          />
        </chakra.span>
      </Flex>
      {username && displayName && (
        <Flex mb={2} mt={1} onClick={onOpen}>
          <chakra.span
            fontSize={13}
            display={"inline-flex"}
            opacity={0.8}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            _hover={{
              opacity: 0.7,
            }}
          >
            {displayName}
            <Icon ml={1} mt={"1px"} fontSize={9} as={BiSolidDownArrow} />
          </chakra.span>
        </Flex>
      )}
      {header && <Flex py={2}>{header()}</Flex>}
      <LinkUserName isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
