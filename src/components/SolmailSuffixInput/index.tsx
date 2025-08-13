import { Box, chakra, Flex, Input, Spinner } from "@chakra-ui/react";
import { DOMAINS } from "@const/domain";
import { useUsernameStatus } from "@hooks/useUsername";
import { validateUsername } from "@utils/string/username";
import { useRef } from "react";
import { get, useFormContext } from "react-hook-form";
import { FormClaimUsername } from "src/types";

function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let resolver: ((value: any) => void) | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timer) clearTimeout(timer);

    return new Promise((resolve) => {
      resolver = resolve;
      timer = setTimeout(async () => {
        const result = await fn(...args);
        resolver?.(result);
      }, delay);
    });
  };
}

export const SolmailSuffixInput: React.FC = () => {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<FormClaimUsername>();

  const value = getValues().username ?? "";
  const PLACEHOLDER = "your_name";
  const error = get(errors, "username") ?? false;
  const hasError = error && error.message;
  const disablePlaceholder = value && value.length > 20;

  const { mutateAsync, isPending } = useUsernameStatus();

  const debouncedMutateRef = useRef(debounceAsync(mutateAsync, 1000));

  const checkUserName = async (value: string) => {
    const commonValidation = validateUsername(value);
    if (typeof commonValidation === "string") {
      return commonValidation;
    }

    const account = await debouncedMutateRef.current({ username: value });
    if (account && account.username) {
      return "Username not available";
    }
    return true;
  };

  watch(["username"]);

  return (
    <Box w="100%">
      <Box
        w="100%"
        bg={!hasError ? "solana.middle" : "red.500"}
        borderRadius="50px"
        transition="all ease .2s"
        p="2px"
        fontSize={18}
      >
        <Box
          position="relative"
          bg="surface.300"
          borderRadius="50px"
          overflow="hidden"
        >
          {isPending && (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              position={"absolute"}
              right={5}
              top={0}
              bottom={0}
            >
              <Spinner size={"sm"} />
            </Flex>
          )}
          <Input
            position="relative"
            zIndex={2}
            placeholder={PLACEHOLDER}
            fontSize="inherit"
            bg="transparent"
            color="light.100"
            autoComplete="off"
            readOnly={isPending}
            textTransform={disablePlaceholder ? "initial" : "lowercase"}
            pr="120px"
            {...register("username", {
              required: "Username is required",
              validate: checkUserName,
            })}
          />

          <Input
            as={Flex}
            fontSize="inherit"
            position="absolute"
            inset={0}
            alignItems="center"
            bg="transparent"
            zIndex={1}
            transition="all ease .2s"
            opacity={disablePlaceholder ? 0 : 1}
            textTransform={"lowercase"}
          >
            <chakra.span opacity={0}>{value || PLACEHOLDER}</chakra.span>
            <chakra.span color="solana.middle">{DOMAINS.DEFAULT}</chakra.span>
          </Input>

          <Input
            as={Flex}
            fontSize="inherit"
            position="absolute"
            right={0}
            bottom={0}
            top={0}
            zIndex={1}
            alignItems="center"
            color="blue"
            justifyContent="flex-end"
            bg="transparent"
            transition="all ease .2s"
            opacity={disablePlaceholder ? 1 : 0}
          >
            <chakra.span bg="surface.30" color="solana.middle">
              {DOMAINS.DEFAULT}
            </chakra.span>
          </Input>
        </Box>
      </Box>

      {hasError && (
        <Flex color="red.500" px={8} my={1}>
          {error.message ?? ""}
        </Flex>
      )}
    </Box>
  );
};
