import { chakra, Flex, type BoxProps } from "@chakra-ui/react";
import { getAvatarColor } from "@utils/string";

export const Avatar: React.FC<{ name: string } & BoxProps> = ({
  name = "",
  ...boxProps
}) => {
  const bg = getAvatarColor(name);
  return (
    <Flex
      boxSize={"30px"}
      bg={bg}
      borderRadius={8}
      left={0}
      top={0}
      fontSize={12}
      fontWeight={"medium"}
      position={"absolute"}
      {...boxProps}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <chakra.span opacity={0.8}>{name[0].toUpperCase()}</chakra.span>
    </Flex>
  );
};
