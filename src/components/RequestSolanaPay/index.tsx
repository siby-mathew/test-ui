import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  type ModalProps,
  useRadioGroup,
  HStack,
  Box,
  useRadio,
  Flex,
  Input,
  VStack,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import SolanaPayLogo from "@assets/solanapay-logo.light.svg";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { ReactNode } from "react";
import { tokens } from "@const/tokens";
import { usePrivyWallet } from "@hooks/usePrivyWallet";

import { FieldWrapper } from "@components/Field";
import { isFunction } from "lodash";
import type { SolanaPayPayload } from "src/types";

type SolanaPayForm = {
  message: string;
  amount: string;
  token: string;
};

const RadioCard: React.FC<{ children: ReactNode }> = ({
  children,
  ...props
}) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="25px"
        boxShadow="md"
        transition={"all ease .2s"}
        borderColor={"surface.500"}
        _checked={{
          bg: "green.600",
          color: "white",
          borderColor: "green.800",
        }}
        _focus={{
          boxShadow: "none",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};
export const RequestSolanaPay: React.FC<
  Omit<ModalProps, "children"> & {
    onSubmit: (payload: SolanaPayPayload) => void;
  }
> = ({ onSubmit, onClose, ...props }) => {
  const methods = useForm<SolanaPayForm>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      token: "SOL",
    },
  });
  const onChangeHandler = (value: string) => {
    methods.setValue("token", value, {
      shouldValidate: !0,
    });
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "token",
    defaultValue: "SOL",
    onChange: onChangeHandler,
  });

  const group = getRootProps();
  const onSubmitHandler: SubmitHandler<SolanaPayForm> = ({
    amount,
    token,
    message,
  }) => {
    if (isFunction(onSubmit)) {
      onSubmit({
        "data-recipient": wallet?.address ?? "",
        class: "payment-button",
        "data-amount": Number(amount).toString(),
        "data-tokenaddress": token ?? "",
        "data-message": message ?? "",
      });
    }
  };
  const { wallet } = usePrivyWallet();
  return (
    <Modal onClose={onClose} isCentered size={"md"} {...props}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalCloseButton />
        <ModalHeader textAlign={"center"}>
          <Flex direction={"row"} gap={2}>
            Add payment request
            <Image w="70px" src={SolanaPayLogo} alt="Solana pay" hidden />
          </Flex>
        </ModalHeader>
        <FormProvider {...methods}>
          <ModalBody
            id="solana-pay"
            as="form"
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
            <HStack>
              <Flex w="full" mb={2}>
                <FieldWrapper name="wallet" label="Receive wallet">
                  <Flex
                    py={1}
                    wordBreak={"break-all"}
                    opacity={0.5}
                    whiteSpace={"pre-wrap"}
                    fontSize={13}
                  >
                    {wallet?.address ?? ""}
                  </Flex>
                </FieldWrapper>
              </Flex>
            </HStack>
            <HStack {...group} mt={4}>
              {tokens.map((token) => {
                const radio = getRadioProps({ value: token.address });
                return (
                  <RadioCard key={token.address} {...radio}>
                    <Flex direction={"row"}>
                      <Flex alignItems={"center"}>
                        <Image
                          boxSize={"20px"}
                          minW={"20px"}
                          src={token.logo}
                        />
                        <Flex fontWeight={"medium"} mx={1}>
                          {token.symbol}
                        </Flex>
                      </Flex>
                    </Flex>
                  </RadioCard>
                );
              })}
            </HStack>

            <VStack mt={4}>
              <Flex w="full" mb={2} mt={1}>
                <FieldWrapper label="Amount" name="amount" hasPadding={!1}>
                  <Input
                    step={"any"}
                    type="number"
                    placeholder="Amount"
                    {...methods.register("amount", {
                      required: "Amount is required",
                    })}
                  />
                </FieldWrapper>
              </Flex>

              <Flex w="full" mb={2} mt={1}>
                <FieldWrapper label="Add a note" name="message" hasPadding={!1}>
                  <Input
                    placeholder="Add a note"
                    {...methods.register("message", {
                      required: "Note is required",
                      maxLength: {
                        value: 60,
                        message: "Maximum 60 characters allowed ",
                      },
                    })}
                  />
                </FieldWrapper>
              </Flex>
            </VStack>
          </ModalBody>
        </FormProvider>
        <ModalFooter gap={4}>
          <Button onClick={onClose}>Cancel</Button>
          <Button form="solana-pay" variant={"green"} type="submit">
            Add Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
