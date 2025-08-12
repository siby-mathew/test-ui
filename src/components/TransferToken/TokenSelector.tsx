import {
  chakra,
  Flex,
  Icon,
  Image,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { TokenList } from "@components/TokenList";
import { useTokenMeta } from "@hooks/useTokensOwned";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TokenTransferForm } from "src/types/token";

export const TokenSelector: React.FC = () => {
  const { register, getValues, setValue } = useFormContext<TokenTransferForm>();
  const value = getValues().token;
  const { token } = useTokenMeta(value);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    register("token", {
      required: "Token is required",
    });
  }, [register]);

  const onSelectToken = (mint: string) => {
    setValue("token", mint);
    onClose();
  };

  return (
    <FieldWrapper label="Token" name="token">
      <TokenList onSelect={onSelectToken} isOpen={isOpen} onClose={onClose} />
      <Input
        position={"relative"}
        variant={"payment"}
        as={Flex}
        w="100%"
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Flex position={"absolute"} inset={0} direction={"row"}>
          <Flex w="60px" alignItems={"center"} justifyContent={"center"}>
            <Image boxSize={"40px"} borderRadius={"50%"} src={token?.logo} />
          </Flex>
          <Flex flex={"auto"} position={"relative"}>
            <Flex p={2} position={"absolute"} inset={0} alignItems={"center"}>
              <chakra.span fontWeight={"bold"}>{token?.symbol}</chakra.span>
            </Flex>
          </Flex>
          <Flex w="40px" alignItems={"center"} justifyContent={"center"}>
            <Icon fontSize={22} as={MdOutlineKeyboardArrowDown} />
          </Flex>
        </Flex>
      </Input>
    </FieldWrapper>
  );
};
