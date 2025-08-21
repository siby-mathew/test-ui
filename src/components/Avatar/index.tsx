import {
  chakra,
  Flex,
  Image,
  useColorModeValue,
  type BoxProps,
} from "@chakra-ui/react";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { getAvatarColor } from "@utils/string";
import Piegion from "@assets/piegion.png";
export const Avatar: React.FC<
  { name: string; isInternalMail?: boolean } & BoxProps
> = ({ name = "", isInternalMail = !1, ...boxProps }) => {
  const { displayName } = useGetLinkedUsernameById(name);
  const bg = getAvatarColor(displayName ?? "");
  const color = useColorModeValue("light.100", "");
  return (
    <Flex
      boxSize={"30px"}
      color={color}
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
      {!isInternalMail && (
        <chakra.span opacity={0.8}>{displayName[0].toUpperCase()}</chakra.span>
      )}

      {isInternalMail && <Image src={Piegion} borderRadius={"inherit"} />}
    </Flex>
  );
};
