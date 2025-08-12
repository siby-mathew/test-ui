import { Flex, Input } from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";

import { useTokenMeta, useTokensOwned } from "@hooks/useTokensOwned";
import { formatTokenBalance } from "@utils/formating";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { TokenTransferForm } from "src/types/token";

export const PaymentAmount: React.FC = () => {
  const { register, getValues, watch } = useFormContext<TokenTransferForm>();
  const token = getValues().token;
  const { token: tokenMeta } = useTokenMeta(token);
  const { data } = useTokensOwned();
  const tokenDetails = useMemo(() => {
    if (!data || !data.token_accounts) {
      return null;
    }
    return data.token_accounts.find((item) => item.mint === token);
  }, [data, token]);
  watch(["token"]);
  return (
    <FieldWrapper hasPadding={!1} name="amount" label="Amount">
      <Input
        type="number"
        variant={"payment"}
        placeholder="Amount"
        {...register("amount", {
          required: "Amount is required",
        })}
      />
      <Flex fontSize={13} justifyContent={"space-between"} py={2}>
        <Flex>Available balance</Flex>
        {tokenDetails && (
          <Flex fontWeight={"bold"}>
            {formatTokenBalance(
              tokenDetails?.amount,
              tokenMeta?.decimals ?? 9,
              tokenMeta?.symbol
            )}
          </Flex>
        )}
      </Flex>
    </FieldWrapper>
  );
};
