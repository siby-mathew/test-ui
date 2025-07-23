import { Box, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { ComposerFormInputs } from "src/types";
const MAXIMUM_LENGTH = 80;
export const Subject: React.FC = () => {
  const { register, getValues, watch } = useFormContext<ComposerFormInputs>();
  const value = getValues()["subject"];
  watch(["subject"]);
  return (
    <Box position={"relative"} w="100%">
      <Input
        id="subject"
        pr={"55px"}
        position={"relative"}
        zIndex={1}
        maxLength={80}
        placeholder="Subject"
        variant={"secondary"}
        {...register("subject", {
          required: "Subject cannot be empty",
          maxLength: {
            value: MAXIMUM_LENGTH,
            message: `Maximum length should be ${MAXIMUM_LENGTH}`,
          },
        })}
      />
      <Box
        px={3}
        opacity={0.5}
        position={"absolute"}
        inset={0}
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        {value.length}/{MAXIMUM_LENGTH}
      </Box>
    </Box>
  );
};
