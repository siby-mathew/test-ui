import { chakra, Flex, Image } from "@chakra-ui/react";
import { useToken } from "@hooks/useToken";
import SolanaPayLogo from "@assets/solanapay-logo.light.svg";
export const SolanaPayRequest: React.FC<{ amount: string; token: string }> = ({
  amount,
  token,
}) => {
  const { symbol } = useToken(token ?? "");
  return (
    <Flex
      fontSize={12}
      px="1"
      borderRadius={3}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      fontWeight={"medium"}
      color={"light.100"}
    >
      <Image mr={1} w="40px" src={SolanaPayLogo} />
      <chakra.span
        position={"relative"}
        top={"1px"}
      >{`${Number(amount)} ${symbol}`}</chakra.span>
    </Flex>
  );
};
