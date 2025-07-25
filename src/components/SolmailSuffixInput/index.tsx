import { Box, chakra, Flex, Input } from "@chakra-ui/react";

import { validateUsername } from "@utils/string/username";

import { get, useFormContext } from "react-hook-form";
import { FormClaimUsername } from "src/types";

export const SolmailSuffixInput: React.FC = () => {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<FormClaimUsername>();
  const value = getValues().username ?? "";
  const PLACEHOLDER = "your_name";
  const error = get(errors, "username") ?? !1;
  const hasError = error && error.message;
  const disablePlaceholder = value && value.length > 20;

  watch(["username"]);

  return (
    <Box w="100%">
      <Box
        w="100%"
        bg={!hasError ? "solana.middle" : "red.500"}
        borderRadius={"50px"}
        transition={"all ease .2s"}
        p="2px"
        fontSize={18}
      >
        <Box
          position={"relative"}
          bg={"surface.300"}
          borderRadius={"50px"}
          overflow={"hidden"}
        >
          <Input
            position={"relative"}
            zIndex={2}
            placeholder={PLACEHOLDER}
            fontSize={"inherit"}
            bg="transparent"
            color={"light.100"}
            autoComplete="off"
            pr={"120px"}
            {...register("username", {
              required: "Username is required",
              validate: validateUsername,
            })}
          />
          <Input
            as={Flex}
            fontSize={"inherit"}
            position={"absolute"}
            inset={0}
            alignItems={"center"}
            bg="transparent"
            zIndex={1}
            transition={"all ease .2s"}
            opacity={disablePlaceholder ? 0 : 1}
          >
            <chakra.span opacity={0}>{value || PLACEHOLDER}</chakra.span>
            <chakra.span color={"solana.middle"}>@sol.mail</chakra.span>
          </Input>

          <Input
            as={Flex}
            fontSize={"inherit"}
            position={"absolute"}
            right={0}
            bottom={0}
            top={0}
            zIndex={1}
            alignItems={"center"}
            color={"blue"}
            justifyContent={"flex-end"}
            bg="transparent"
            transition={"all ease .2s"}
            opacity={disablePlaceholder ? 1 : 0}
          >
            <chakra.span bg="surface.30" color={"solana.middle"}>
              @sol.mail
            </chakra.span>
          </Input>
        </Box>
      </Box>
      {hasError && (
        <Flex color={"red.500"} px={8} my={1}>
          {error.message ?? ""}
        </Flex>
      )}
    </Box>
  );
};
