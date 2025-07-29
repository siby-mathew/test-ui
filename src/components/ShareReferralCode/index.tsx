import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { ClipboardText } from "@components/ClipboardText";
import { useProfile } from "@hooks/useProfile";

export const ShareReferralCode: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { data } = useProfile();
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader textAlign={"center"}>
          Refer and Earn
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <ClipboardText textToCopy={data?.referral_code ?? ""}>
            {data?.referral_code ?? ""}
          </ClipboardText>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
