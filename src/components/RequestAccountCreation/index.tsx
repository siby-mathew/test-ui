import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tooltip,
  type ModalProps,
} from "@chakra-ui/react";
import { ClipboardText } from "@components/ClipboardText";
import { keyframes } from "@emotion/react";
import { useBalance } from "@hooks/useBalance";
import { useCreateMailbox } from "@hooks/useMailAccount";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useSessionHandler } from "@hooks/useSessionHandler";
import { isFunction } from "lodash";
import { useMemo } from "react";
import { GrRefresh } from "react-icons/gr";
import { RiShutDownLine } from "react-icons/ri";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
export const RequestAccountCreation: React.FC<
  Omit<ModalProps, "children"> & {
    onSuccess: () => void;
    isRefetching: boolean;
  }
> = ({ isRefetching: checkingMailAccountStatus, onSuccess, ...props }) => {
  const { mutateAsync, isPending } = useCreateMailbox();
  const { formattedBalance, isRefetching, refetch } = useBalance();
  const { wallet } = usePrivyWallet();
  const [disabled, tooltip] = useMemo(() => {
    const balance = parseFloat(formattedBalance);
    if (balance > 0) {
      return [!1, ""];
    } else {
      return [!0, "Insufficient balance"];
    }
  }, [formattedBalance]);
  const { onLogout, isPending: isSigningOut } = useSessionHandler();
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
        <ModalBody pt={0}>
          <Flex direction={"column"}>
            <Flex
              alignItems={"center"}
              color={"green.500"}
              justifyContent={"center"}
            >
              <ClipboardText>{wallet?.address ?? ""}</ClipboardText>
            </Flex>
            <Flex
              fontWeight={"bold"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              Available balance
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"}>
              {formattedBalance}
              <IconButton
                ml={2}
                aria-label="Refresh"
                icon={<GrRefresh />}
                size={"sm"}
                onClick={() => refetch()}
                animation={
                  isRefetching ? `${spin} 1s linear infinite` : undefined
                }
              />
            </Flex>
            <Flex pt={5} alignItems={"center"} justifyContent={"center"}>
              <Tooltip label={tooltip} isDisabled={!disabled}>
                <Button
                  colorScheme="green"
                  disabled={disabled}
                  onClick={onClickHandler}
                >
                  {isPending || checkingMailAccountStatus || isSigningOut ? (
                    <Spinner size={"sm"} />
                  ) : (
                    "Create mailbox"
                  )}
                </Button>
              </Tooltip>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
              borderTop={"solid 1px"}
              borderTopColor={"surface.500"}
              pt={4}
              mt={3}
              fontSize={13}
              opacity={0.6}
            >
              Please add funds to your embedded wallet before creating a
              mailbox.
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
