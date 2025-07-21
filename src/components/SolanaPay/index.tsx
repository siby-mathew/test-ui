import {
  Button,
  chakra,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  VStack,
  type ModalProps,
} from "@chakra-ui/react";

import SolanaPayIcon from "@assets/solanapay-logo.light.svg";
import { ClipboardText } from "@components/ClipboardText";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PaymentConfig, StatusType } from "src/types";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { createQR, encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
import { useSolanaPay } from "@hooks/useSolanaPay";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useToken } from "@hooks/useToken";
export const SolanaPay: React.FC<
  Omit<ModalProps, "children"> &
    PaymentConfig & {
      onStatusChange: (s: StatusType) => void;
    }
> = ({
  onStatusChange,
  isOpen,
  onClose,
  amount,
  recipient,
  message,
  token,
  ...props
}) => {
  const { symbol, address } = useToken(token ?? "");
  const { id } = useMailBoxContext();
  const [paymentUrl, setUrl] = useState<URL | null>(null);
  const [reference, setReference] = useState<PublicKey | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { isOpen: isDone, onOpen } = useDisclosure();
  const { isPending, sendTransaction } = useSolanaPay({
    ref: reference,
    qrUrl: paymentUrl,
    onSuccess: onClose,
    onPaymentStatusUpdate: useCallback(
      (s: StatusType) => {
        if (s.isDone) {
          onOpen();
        }

        onStatusChange(s);
      },
      [onOpen, onStatusChange]
    ),
  });
  const createQrCode = useCallback(async () => {
    const amountBigint = new BigNumber(amount);
    const to = new PublicKey(recipient);

    const reference = await PublicKey.createWithSeed(
      new PublicKey(id ?? ""),
      "SolmailSolanaPay",
      SystemProgram.programId
    );

    const url = encodeURL({
      recipient: to,
      amount: amountBigint,
      reference,
      label: "Solmail",
      message,
      splToken: symbol !== "SOL" ? new PublicKey(address) : undefined,
    });
    setReference(reference);
    setUrl(url);
  }, [address, amount, id, message, recipient, symbol]);

  useEffect(() => {
    if (!paymentUrl) {
      createQrCode();
    }
  }, [createQrCode, paymentUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (paymentUrl && qrRef.current && isOpen) {
        const qrCode = createQR(paymentUrl, 250, "transparent");
        if (qrRef.current) {
          qrRef.current.innerHTML = "";
          qrCode.append(qrRef.current);
        }
      }
    });
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [paymentUrl, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // variant={"secondary"}
      isCentered
      size={"md"}
      {...props}
    >
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalCloseButton />
        <ModalHeader>
          <Image w="70px" src={SolanaPayIcon} />
        </ModalHeader>
        <ModalBody pb={5}>
          <VStack w="100%">
            <Flex fontWeight={"bold"} fontSize={20}>
              {Number(amount)} {symbol}
            </Flex>
            <Flex>
              <ClipboardText>{recipient}</ClipboardText>
            </Flex>
            {!isDone && (
              <>
                <Flex>Pay with embedded wallet</Flex>
                <Flex>
                  <Button variant="green" onClick={sendTransaction}>
                    Pay now {isPending && <Spinner size={"sm"} ml={2} />}
                  </Button>
                </Flex>

                <Flex
                  position={"relative"}
                  w="100%"
                  alignItems={"center"}
                  justifyContent={"center"}
                  _after={{
                    content: "''",
                    height: "1px",
                    w: "100%",
                    bg: "surface.800",
                    position: "absolute",
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    my: "auto",
                    opacity: 0.2,
                  }}
                >
                  <chakra.span
                    px={4}
                    bg="surface.400"
                    position={"relative"}
                    zIndex={1}
                  >
                    Or
                  </chakra.span>
                </Flex>
                <Flex>Scan QR code with mobile wallet</Flex>

                <Flex ref={qrRef} bg="light.100" borderRadius={"lg"}></Flex>
              </>
            )}
            <Flex>{message}</Flex>
            <Flex fontWeight={"bold"} bg="solana" bgClip={"text"}>
              Solmail
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
