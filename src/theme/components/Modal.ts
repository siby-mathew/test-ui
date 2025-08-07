import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const primary = definePartsStyle({
  overlay: {
    backdropFilter: "blur(2px)",
  },
  dialog: {
    borderRadius: "15px",
    bg: "surface.900",
  },
});

const secondary = definePartsStyle({
  overlay: {
    backdropFilter: "blur(2px)",
  },
  dialog: {
    borderRadius: "15px",
    bg: "light.100",
    color: "dark.100",
  },
});

export const Modal = defineMultiStyleConfig({
  variants: { primary, secondary },
  defaultProps: {
    variant: "primary",
  },
});
