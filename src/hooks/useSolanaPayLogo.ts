import SolanaPayLogoDark from "@assets/solanapay-logo.dark.svg";
import SolanaPayLogoLight from "@assets/solanapay-logo.light.svg";
import { useColorModeValue } from "@chakra-ui/react";
export const useSolanaPayLogo = () => {
  return useColorModeValue(SolanaPayLogoDark, SolanaPayLogoLight);
};
