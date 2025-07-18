import { Image, type BoxProps } from "@chakra-ui/react";
import Logo from "@assets/solana.png";
export const SolanaLogo: React.FC<BoxProps> = ({ ...props }) => {
  return <Image src={Logo} alt="Solana" {...props} />;
};
