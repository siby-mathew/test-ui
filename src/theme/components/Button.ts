import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

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
export const Button = defineStyleConfig({
  variants: { danger, green, red },
});
