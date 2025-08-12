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
import { TokenCard } from "@components/TokenCard";
import { useTokensOwned } from "@hooks/useTokensOwned";

export const TokenList: React.FC<
  Omit<ModalProps, "children"> & {
    onSelect: (id: string) => void;
  }
> = ({ onClose, onSelect, ...props }) => {
  const { data } = useTokensOwned();
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          Select Token
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <VStack w="100%">
            {data &&
              data.token_accounts &&
              data.token_accounts.map((token) => {
                return (
                  <Flex
                    w="100%"
                    key={token.address}
                    onClick={() => onSelect(token.mint)}
                  >
                    <TokenCard {...token} />
                  </Flex>
                );
              })}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
