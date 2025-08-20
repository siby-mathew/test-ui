import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const danger = defineStyle({
  bg: "red.500",
  color: "light.100",
  _hover: {
    bg: "red.400",
  },
});

const green = defineStyle({
  bg: "green.500",
  color: "light.100",
  _hover: {
    bg: "green.400",
  },
  _disabled: {
    bg: "green.400 !important",
  },
});

const red = defineStyle({
  bg: "red.500",
  color: "red.100",
  _hover: {
    bg: "red.400",
  },
  _active: {
    bg: "red.400",
  },
  _disabled: {
    bg: "red.500 !important",
  },
});

const solana = defineStyle((props) => ({
  bg: "solana",
  color: mode("white", "black")(props),
  _hover: {
    opacity: 0.8,
  },
}));

export const Button = defineStyleConfig({
  variants: { danger, green, red, solana },
});
