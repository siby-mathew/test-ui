import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { TokenCard } from "@components/TokenCard";
import { useTokensOwned } from "@hooks/useTokensOwned";

export const TokenList: React.FC<
  Omit<ModalProps, "children"> & {
    onSelect: (id: string) => void;
    selected?: string;
  }
> = ({ selected, onClose, onSelect, ...props }) => {
  const { formattedTokens: tokens, isLoading } = useTokensOwned();
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          Select Token
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <VStack w="100%" pb={5}>
            {isLoading && (
              <Flex minH={100} alignItems={"center"} justifyContent={"center"}>
                <Spinner />
              </Flex>
            )}
            {!isLoading &&
              tokens &&
              tokens.length > 0 &&
              tokens.map((token) => {
                const isSelected = selected && token.mint === selected;
                return (
                  <Flex
                    w="100%"
                    key={token.address}
                    onClick={() => {
                      if (isSelected) {
                        return;
                      }
                      onSelect(token.mint);
                    }}
                    transition={"all ease .2s"}
                    borderRadius={8}
                    bg={isSelected ? "surface.300" : ""}
                    cursor={"initial"}
                    _hover={{
                      bg: "surface.600",
                    }}
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
