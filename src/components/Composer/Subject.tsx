import { Box, Flex, Input } from "@chakra-ui/react";
import { useComposer } from "@hooks/useComposer";
import { useFormContext } from "react-hook-form";
import type { ComposerFormInputs } from "src/types";
const MAXIMUM_LENGTH = 80;

export const Subject: React.FC = () => {
  const { register, getValues, watch } = useFormContext<ComposerFormInputs>();
  const { thread } = useComposer();
  const value = getValues()["subject"];
  watch(["subject"]);
  return (
    <Input as={Box} position={"relative"} w="100%" p={0}>
      <Input
        id="subject"
        pr={"55px"}
        position={"relative"}
        zIndex={1}
        maxLength={80}
        placeholder={!thread ? "Subject" : ""}
        bg="transparent !important"
        pl={thread ? 10 : ""}
        variant={"secondary"}
        {...register("subject", {
          required: "Subject cannot be empty",
          maxLength: {
            value: MAXIMUM_LENGTH,
            message: `Maximum length should be ${MAXIMUM_LENGTH}`,
          },
        })}
      />
      {thread && (
        <Input
          alignItems={"center"}
          position={"absolute"}
          top={0}
          left={0}
          bottom={0}
          as={Flex}
          p={0}
          px={3}
          fontSize={13}
        >
          Re :
        </Input>
      )}
      <Box
        px={3}
        position={"absolute"}
        inset={0}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        fontSize={13}
      >
        {value.length}/{MAXIMUM_LENGTH}
      </Box>
    </Input>
  );
};
