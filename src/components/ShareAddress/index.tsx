import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  VStack,
} from "@chakra-ui/react";
import { ClipboardText } from "@components/ClipboardText";
import { SolanaPayQR } from "@components/Qr";
import { SolBalance } from "@components/SolBalance";

import { usePrivyWallet } from "@hooks/usePrivyWallet";

export const ShareAddress: React.FC<Omit<ModalProps, "children">> = ({
  ...props
}) => {
  const { wallet } = usePrivyWallet();

  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalCloseButton />
        <ModalHeader textAlign={"center"}>Deposit Tokens</ModalHeader>
        <ModalBody pt={0} pb={10}>
          <VStack>
            <Flex opacity={0.8} fontSize={13}>
              Deposit SOL into your account shown below
            </Flex>
            <Flex my={2}>
              <SolanaPayQR address={wallet?.address ?? ""} />
            </Flex>
            <Flex maxW={"70%"}>
              <ClipboardText>{wallet?.address}</ClipboardText>
            </Flex>
            <Flex>
              Balance: <SolBalance />
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
