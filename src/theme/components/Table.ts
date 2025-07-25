import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const primary = definePartsStyle({
  td: {
    borderColor: "transparent",
  },
});

export const Table = defineMultiStyleConfig({
  variants: {
    primary,
  },
  defaultProps: {
    variant: "primary",
  },
});
