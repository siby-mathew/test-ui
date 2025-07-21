import { Box, Button, chakra, Icon, Image } from "@chakra-ui/react";
import SolanaPayLogo from "@assets/solanapay-logo.light.svg";
import { useFormContext } from "react-hook-form";
import { type ComposerFormInputs } from "src/types";
import { useToken } from "@hooks/useToken";
import { IoClose } from "react-icons/io5";
export const SolanaPayButton: React.FC<{ onOpenSolanaPay: () => void }> = ({
  onOpenSolanaPay,
}) => {
  const { getValues, watch, setValue } = useFormContext<ComposerFormInputs>();
  watch(["solanaPay"]);
  const solanaPay = getValues().solanaPay;
  const hasSolanaPay = Object.keys(solanaPay ?? {}).length > 0;
  const { symbol } = useToken(solanaPay?.["data-tokenaddress"] ?? "");

  const onClickRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setValue("solanaPay", undefined);
  };
  return (
    <Button
      pr={hasSolanaPay ? "50px" : ""}
      onClick={onOpenSolanaPay}
      position={"relative"}
    >
      <Image w="50px" src={SolanaPayLogo} alt="Solana pay" />
      {hasSolanaPay && solanaPay && (
        <>
          <chakra.span
            mx={2}
          >{`${solanaPay["data-amount"]} ${symbol}`}</chakra.span>
          <Box
            borderRightRadius={"inherit"}
            bg="red.500"
            position={"absolute"}
            right={0}
            top={0}
            bottom={0}
            display={"flex"}
            width="40px"
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onClickRemove}
            transition={"all ease .2s"}
            _hover={{
              bg: "red.600",
            }}
          >
            <Icon as={IoClose} />
          </Box>
        </>
      )}
    </Button>
  );
};
