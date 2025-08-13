import {
  Alert,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useClipboard,
  VStack,
} from "@chakra-ui/react";

import { SolanaPayQR } from "@components/Qr";
import { SolBalance } from "@components/SolBalance";

import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { FaCopy } from "react-icons/fa6";
import { TbCopyCheckFilled } from "react-icons/tb";

export const ShareAddress: React.FC<Omit<ModalProps, "children">> = ({
  ...props
}) => {
  const { wallet, address } = usePrivyWallet();
  const { onCopy, hasCopied } = useClipboard(address);
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
            <Flex my={4}>
              <SolanaPayQR address={wallet?.address ?? ""} />
            </Flex>
            <Flex
              maxW={"90%"}
              wordBreak={"break-all"}
              borderRadius={10}
              fontSize={13}
              textAlign={"center"}
              p={2}
              px={4}
              pr={"40px"}
              position={"relative"}
              cursor={"pointer"}
              onClick={onCopy}
              transition={"all ease .2s"}
              as={Alert}
              status="success"
            >
              <Flex
                w="40px"
                position={"absolute"}
                right={0}
                top={0}
                bottom={0}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Icon as={hasCopied ? TbCopyCheckFilled : FaCopy} />
              </Flex>
              {wallet?.address}
            </Flex>
            <Flex alignItems={"center"}>
              Balance: <SolBalance />
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
