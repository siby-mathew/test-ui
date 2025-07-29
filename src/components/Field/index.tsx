import { Box, Flex, Icon } from "@chakra-ui/react";

import type { ReactNode } from "react";
import { useFormContext, get } from "react-hook-form";
import { MdOutlineError } from "react-icons/md";

type FieldWrapperProps = {
  children: ReactNode;
  label?: string;
  name: string;
  leftLabel?: string;
  hasPadding?: boolean;
  id?: string;
};
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  label,
  name,
  leftLabel,
  hasPadding = !0,
  id,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, name);
  return (
    <Box w="full">
      {label && (
        <Box w="full" fontWeight={"medium"} as="label" htmlFor={id}>
          {label}
        </Box>
      )}
      <Box w="full" my={1} position={"relative"}>
        {leftLabel && (
          <Flex
            zIndex={2}
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            bg="surface.400"
            borderLeftRadius={10}
            px={3}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            {leftLabel}
          </Flex>
        )}
        {children}
      </Box>
      {error && error.message && (
        <Box
          px={hasPadding ? "30px" : 0}
          mb={1}
          color={"red.500"}
          display={"flex"}
          alignItems={"center"}
          fontSize={13}
        >
          <Icon as={MdOutlineError} mr={1} />
          {error.message}
        </Box>
      )}
    </Box>
  );
};
