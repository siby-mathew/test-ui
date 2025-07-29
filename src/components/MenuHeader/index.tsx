import { chakra, Flex } from "@chakra-ui/react";
import { MenuConfig } from "src/types";

export const MenuHeader: React.FC<MenuConfig> = ({ name, header }) => {
  return (
    <Flex direction={"column"} mb={2}>
      <Flex fontWeight={"bold"} fontSize={18}>
        <chakra.span>{name}</chakra.span>
      </Flex>
      {header && <Flex py={2}>{header()}</Flex>}
    </Flex>
  );
};
