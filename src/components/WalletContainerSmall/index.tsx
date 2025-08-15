import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const WalletContainerSmall: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Box w="100%" maxW={500} mx="auto">
      {children}
    </Box>
  );
};
