import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { FormProvider, useForm } from "react-hook-form";
import { TokenTransferForm } from "src/types/token";
import { PaymentAmount } from "./Amount";
import { isValidAddress } from "@utils/string";
import { TokenSelector } from "./TokenSelector";

export const TransferToken: React.FC = () => {
  const methods = useForm<TokenTransferForm>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      token: import.meta.env.VITE_SOLMAIL_SOLANA_ADDRESS,
    },
  });

  const onFocusHandler = async () => {
    const { getValues, setValue } = methods;
    try {
      const text = await navigator.clipboard.readText();
      if (text && isValidAddress(text)) {
        const value = getValues().to;
        if (value.trim()) {
          return;
        }
        setValue("to", text.trim());
      }
    } catch {
      return null;
    }
  };
  return (
    <FormProvider {...methods}>
      <Flex direction={"column"}>
        <Flex mb={5} fontSize={18} fontWeight={"bold"}>
          Pay
        </Flex>
        <Flex w="100%">
          <VStack gap={4} w="100%">
            <FieldWrapper hasPadding={!1} name="to" label="Send to">
              <Input
                {...methods.register("to", {
                  required: "Reccpient address is required",
                })}
                variant={"payment"}
                placeholder="Send to"
                onFocus={onFocusHandler}
              />
            </FieldWrapper>
            <TokenSelector />
            <PaymentAmount />
            <Flex w="100%">
              <Button
                h="55px"
                size={"lg"}
                borderRadius={30}
                w="100%"
                variant="green"
              >
                Pay now
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </FormProvider>
  );
};
