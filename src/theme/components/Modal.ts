import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    backdropFilter: "blur(2px)",
  },
  dialog: {
    borderRadius: "15px",
    bg: "surface.400",
  },
});

export const Modal = defineMultiStyleConfig({
  baseStyle,
});
