import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  type ModalProps,
} from "@chakra-ui/react";
import { ClipboardText } from "@components/ClipboardText";

import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSessionHandler } from "@hooks/useSessionHandler";
import { useWalletSignerApi } from "@hooks/useWalletSigner";
import isFunction from "lodash/isFunction";

import { RiShutDownLine } from "react-icons/ri";

export const RequestAccountCreation: React.FC<
  Omit<ModalProps, "children"> & {
    onSuccess: () => void;
    isRefetching: boolean;
  }
> = ({ isRefetching: checkingMailAccountStatus, onSuccess, ...props }) => {
  const { wallet } = usePrivyWallet();

  const { onLogout, isPending: isSigningOut } = useSessionHandler();

  const { mutateAsync, isPending } = useWalletSignerApi();
  const onClickHandler = async () => {
    try {
      const res = await mutateAsync();
      if (res) {
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }
    } catch {
      return;
    }
  };

  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader textAlign={"center"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Flex>Create mailbox</Flex>
            <Flex>
              <Button
                onClick={onLogout}
                size={"sm"}
                rightIcon={<RiShutDownLine />}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalBody pt={0} mb={5}>
          <Flex direction={"column"}>
            <Flex
              alignItems={"center"}
              color={"green.500"}
              justifyContent={"center"}
            >
              <ClipboardText>{wallet?.address ?? ""}</ClipboardText>
            </Flex>

            <Flex pt={5} alignItems={"center"} justifyContent={"center"}>
              <Button colorScheme="green" onClick={onClickHandler}>
                {isPending || checkingMailAccountStatus || isSigningOut ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Create mailbox"
                )}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
