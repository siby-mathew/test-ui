import { Flex, Input } from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { BASE_TOKEN } from "@const/tokens";
import { useEstimatedFee } from "@hooks/useEstimatedFee";
import { useGetTokenById, useTokenMeta } from "@hooks/useTokensOwned";
import { formatTokenBalance } from "@utils/formating";
import BigNumber from "bignumber.js";
import { useFormContext } from "react-hook-form";
import { TokenTransferForm } from "src/types/token";
export const PaymentAmount: React.FC = () => {
  const { register, getValues, watch, setValue } =
    useFormContext<TokenTransferForm>();
  const tokenAddress = getValues().token;
  const { token: tokenMeta } = useTokenMeta(tokenAddress);
  const tokenBalance = useGetTokenById(tokenAddress);
  const isBaseToken = tokenAddress === BASE_TOKEN.address;
  const { fee } = useEstimatedFee();
  watch(["token", "amount"]);
  const calculateMaxAmount = (): string => {
    const rawBalance = new BigNumber(tokenBalance?.amount ?? 0);
    const spendable = isBaseToken ? rawBalance.minus(fee ?? 0) : rawBalance;

    return formatTokenBalance({
      rawAmount: spendable.toNumber(),
      mintDecimals: tokenMeta?.decimals ?? 9,
      suffix: "",
    });
  };

  const handleMaxClick = () => {
    const amount = calculateMaxAmount();
    if (parseFloat(amount) > 0) {
      setValue("amount", amount, { shouldValidate: true });
    }
  };

  return (
    <FieldWrapper hasPadding={false} name="" label="Amount">
      <Flex direction="column" w="100%">
        <Flex position="relative" w="100%">
          <Input
            step="any"
            type="number"
            variant="payment"
            placeholder="Amount"
            {...register("amount", {
              required: "Amount is required",
              validate: () => true,
            })}
            pr="80px"
          />
          <Flex
            w="80px"
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            cursor="pointer"
            borderRightRadius="50px"
            bg="surface.600"
            transition="all ease .2s"
            _hover={{ bg: "surface.700" }}
            onClick={handleMaxClick}
          >
            Max
          </Flex>
        </Flex>

        {/* Balance Display */}
        <Flex fontSize={13} justifyContent="space-between" py={2}>
          <Flex>Available balance</Flex>
          {tokenBalance && (
            <Flex fontWeight="bold">
              {formatTokenBalance({
                rawAmount: tokenBalance.amount,
                mintDecimals: tokenMeta?.decimals ?? 9,
                suffix: tokenMeta?.symbol,
              })}
            </Flex>
          )}
        </Flex>
      </Flex>
    </FieldWrapper>
  );
};
