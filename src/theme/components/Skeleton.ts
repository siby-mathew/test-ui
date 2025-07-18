import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const primary = defineStyle({
  _light: {
    [$startColor.variable]: "colors.surface.200",
    [$endColor.variable]: "colors.surface.300",
  },
  _dark: {
    [$startColor.variable]: "colors.surface.200",
    [$endColor.variable]: "colors.surface.300",
  },
});
export const Skeleton = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    variant: "primary",
  },
});
