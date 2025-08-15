import { Button, Flex, Input, Spinner, VStack } from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TokenTransferForm } from "src/types/token";
import { PaymentAmount } from "./Amount";

import { TokenSelector } from "./TokenSelector";

import { useEmailResolver } from "@hooks/useEmailResolver";
import { useGetTokenById, useTokenMeta } from "@hooks/useTokensOwned";
import { usePaymentTransfer } from "@hooks/usePaymentTransfer";
import { useCallback, useMemo } from "react";
import { toRawAmount } from "@utils/formating";
import { BASE_TOKEN } from "@const/tokens";
import { useBalance } from "@hooks/useBalance";
import { useEstimatedFee } from "@hooks/useEstimatedFee";
import BigNumber from "bignumber.js";

export const TransferToken: React.FC = () => {
  const methods = useForm<TokenTransferForm>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      token: import.meta.env.VITE_SOLMAIL_SOLANA_ADDRESS,
    },
  });

  const tokenAddress = methods.getValues().token;
  const { token: tokenMeta } = useTokenMeta(tokenAddress);
  const tokenBalance = useGetTokenById(tokenAddress);
  const isBaseToken = tokenAddress === BASE_TOKEN.address;
  const { fee } = useEstimatedFee();
  const { data: walletBalance } = useBalance();
  const amount = methods.getValues().amount;

  const { token } = useTokenMeta(methods.getValues().token);
  const { mutateAsync, isPending } = usePaymentTransfer();

  const { mutateAsync: resolveEmail } = useEmailResolver();
  const onValidateRecipeint = async (username: string) => {
    const res = await resolveEmail({
      username,
    });
    if (res && !res.status && res.message) {
      return res.message;
    }
  };

  const validateAmount = useCallback(
    (amount: string) => {
      const rawAmount = toRawAmount(amount, tokenMeta?.decimals ?? 9);
      const balance = new BigNumber(tokenBalance?.amount ?? 0);
      const spendableBalance = isBaseToken ? balance.minus(fee ?? 0) : balance;

      if (spendableBalance.lt(0)) return ["Insufficient fund", !1];
      if (rawAmount.gt(spendableBalance)) return ["Insufficient fund", !1];
      if (new BigNumber(walletBalance ?? 0).lt(fee ?? 0))
        return ["Insufficient fee", !1];

      return [true, !0];
    },
    [fee, isBaseToken, tokenBalance?.amount, tokenMeta?.decimals, walletBalance]
  );

  const onSubmitHandler: SubmitHandler<TokenTransferForm> = async ({
    to,
    token: _token,
    amount,
  }) => {
    if (isPending) return;
    const data = await resolveEmail({
      username: to,
    });
    if (!data || !data.address) {
      return;
    }
    await mutateAsync({
      to: data.address?.toString(),
      amount,
      token: _token,
      decimals: token?.decimals ?? 9,
    });
    onReset();
  };

  const [buttonLabel, status] = useMemo(
    () => validateAmount(amount),
    [amount, validateAmount]
  );

  const onReset = () => {
    methods.reset({
      token: import.meta.env.VITE_SOLMAIL_SOLANA_ADDRESS,
      amount: "",
      to: "",
    });
  };
  return (
    <FormProvider {...methods}>
      <Flex
        direction={"column"}
        as={"form"}
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        <Flex w="100%" position={"relative"}>
          {isPending && (
            <Flex position={"absolute"} zIndex={1} inset={0}></Flex>
          )}
          <VStack gap={4} w="100%">
            <FieldWrapper hasPadding={!1} name="to" label="Send to">
              <Input
                autoComplete="off"
                {...methods.register("to", {
                  required: "Reccpient address is required",
                  validate: onValidateRecipeint,
                })}
                variant={"payment"}
                placeholder="Wallet address or .sol domain"
              />
            </FieldWrapper>
            <TokenSelector />
            <PaymentAmount />
            <Flex w="100%" position={"relative"} zIndex={2}>
              <Button
                h="55px"
                size={"lg"}
                borderRadius={30}
                w="100%"
                isDisabled={!status}
                variant={!status ? "red" : "green"}
                type="submit"
              >
                {!isPending ? (
                  <>{typeof buttonLabel === "string" ? buttonLabel : "Send"}</>
                ) : (
                  <Spinner size={"sm"} />
                )}
              </Button>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </FormProvider>
  );
};
