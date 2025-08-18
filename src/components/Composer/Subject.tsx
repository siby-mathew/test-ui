import { Box, Input } from "@chakra-ui/react";
import { MAXIMUM_MAIL_SUBJECT_LENGTH } from "@const/config";

import { useFormContext } from "react-hook-form";
import type { ComposerFormInputs } from "src/types";

export const Subject: React.FC = () => {
  const { register, getValues, watch } = useFormContext<ComposerFormInputs>();

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
        placeholder={"Subject"}
        bg="transparent !important"
        variant={"secondary"}
        {...register("subject", {
          maxLength: {
            value: MAXIMUM_MAIL_SUBJECT_LENGTH,
            message: `Maximum length should be ${MAXIMUM_MAIL_SUBJECT_LENGTH}`,
          },
        })}
      />

      <Box
        px={3}
        position={"absolute"}
        inset={0}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        fontSize={13}
      >
        {value.length}/{MAXIMUM_MAIL_SUBJECT_LENGTH}
      </Box>
    </Input>
  );
};
