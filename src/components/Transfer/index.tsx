import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  type ModalProps,
} from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { SolanaLogo } from "@components/SolanaLogo";
import { useBalance } from "@hooks/useBalance";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useToast } from "@hooks/useToast";
import { useTransfer } from "@hooks/useTransfer";
import { useQueryClient } from "@tanstack/react-query";
import { shortenPrincipalId } from "@utils/string";
import { isValidAddress } from "@utils/string/isValidAddress";
import { isFunction } from "lodash";

import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { QueryKeys, type PaymentConfig } from "src/types";

type Form = {
  recipient: string;
  amount: string;
};
export const TransferFund: React.FC<
  PaymentConfig &
    Omit<ModalProps, "children"> & {
      lockValues?: boolean;
    }
> = ({ amount, recipient, message, lockValues = !1, ...props }) => {
  const { formattedBalance } = useBalance();
  const { mutateAsync, isPending } = useTransfer();
  const queryClient = useQueryClient();
  const methods = useForm<Form>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      recipient,
      amount,
    },
  });
  const { showToast } = useToast();
  const { wallet } = usePrivyWallet();

  const validateAddress = (val: string) => {
    if (isValidAddress(val)) {
      return !0;
    }
    return "Please enter a valid address";
  };

  const onSubmitHandler: SubmitHandler<Form> = async ({
    amount,
    recipient,
  }) => {
    try {
      const res = await mutateAsync({
        amount: parseFloat(amount),
        to: recipient,
      });
      if (res && props.onClose && isFunction(props.onClose)) {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.SOL_BALANCE] });
        props.onClose();
        showToast("Fund trasfered", {
          type: "success",
        });
      } else {
        throw "";
      }
    } catch {
      showToast("Failed to transfer fund", {
        type: "error",
      });
    }
  };
  return (
    <Modal isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalCloseButton />
        {isPending && (
          <Flex
            position={"absolute"}
            inset={0}
            bg="rgba(0,0,0,.2)"
            zIndex={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner />
          </Flex>
        )}
        <ModalHeader>Transfer fund</ModalHeader>
        <ModalBody p="0">
          <FormProvider {...methods}>
            <Flex
              w="100%"
              px={5}
              direction={"column"}
              as="form"
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              <Flex justifyContent={"center"}>Available Balance</Flex>
              <Flex
                fontWeight={"bold"}
                fontSize={18}
                w="full"
                justifyContent={"center"}
              >
                {formattedBalance}
              </Flex>
              <Flex direction={"column"} position={"relative"}>
                <Box
                  position={"absolute"}
                  inset={0}
                  zIndex={1}
                  userSelect={"none"}
                />
                <FieldWrapper name="" label="My Wallet">
                  <Input
                    readOnly
                    value={shortenPrincipalId(wallet?.address, 8, 8)}
                    userSelect={"none"}
                  />
                </FieldWrapper>
              </Flex>

              <Box bg="surface.300" borderRadius={8} mt={2}>
                <Flex direction={"column"}>
                  <FieldWrapper name="to">
                    <Input
                      readOnly={lockValues}
                      autoComplete="off"
                      placeholder="Wallet address"
                      {...methods.register("recipient", {
                        required: "This field is required",
                        validate: validateAddress,
                      })}
                    />
                  </FieldWrapper>
                </Flex>
                <Flex h="1px" opacity={0.5} bg="surface.400"></Flex>

                <Flex direction={"column"} position={"relative"}>
                  <Box
                    position={"absolute"}
                    right={"20px"}
                    boxSize={"30px"}
                    top={0}
                    bottom={0}
                    my="auto"
                    zIndex={2}
                    borderRadius={"50%"}
                    overflow={"hidden"}
                  >
                    <SolanaLogo />
                  </Box>
                  <FieldWrapper name="amount" label="">
                    <Input
                      type="number"
                      pr="60px"
                      fontWeight={"bold"}
                      fontSize={23}
                      autoComplete="off"
                      readOnly={lockValues}
                      placeholder="0.0"
                      {...methods.register("amount", {
                        required: "This field is required",
                      })}
                    />
                  </FieldWrapper>
                </Flex>
              </Box>
              <Flex
                alignItems={"center"}
                color={"yellow.500"}
                fontStyle={"italic"}
                w="full"
                justifyContent={"center"}
                py={2}
              >
                "{message}"
              </Flex>
              <Flex mb={5}>
                <Button
                  type="submit"
                  size={"lg"}
                  w="full"
                  bg="blue.600"
                  borderRadius={10}
                  _hover={{
                    bg: "blue.700",
                  }}
                >
                  Transfer
                </Button>
              </Flex>
            </Flex>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
