import { chakra, Flex } from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useUsernameById } from "@hooks/useUsernames";
import { MenuConfig } from "src/types";

export const MenuHeader: React.FC<MenuConfig> = ({ name, header }) => {
  const { wallet } = usePrivyWallet();
  const { username, displayName } = useUsernameById(wallet?.address);
  return (
    <Flex direction={"column"} mb={2}>
      <Flex fontWeight={"bold"} fontSize={18}>
        <chakra.span>{name}</chakra.span>
      </Flex>
      {username && displayName && (
        <Flex mb={2}>
          <chakra.span
            fontSize={13}
            borderRadius={5}
            display={"inline-flex"}
            opacity={0.8}
          >
            {displayName}
          </chakra.span>
        </Flex>
      )}
      {header && <Flex py={2}>{header()}</Flex>}
    </Flex>
  );
};
