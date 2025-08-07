import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primary = definePartsStyle({
  field: {
    p: 8,
    bg: "surface.300",
    borderRadius: 10,
  },
});

const secondary = definePartsStyle({
  field: {
    px: 4,
    py: 5,
    bg: "surface.400",
    borderRadius: 10,
    fontSize: 13,
    _placeholder: {
      color: "#999",
    },
  },
});

export const Input = defineMultiStyleConfig({
  variants: { primary, secondary },
  defaultProps: {
    variant: "primary",
  },
});
