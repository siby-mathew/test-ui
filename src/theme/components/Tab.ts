import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const primary = definePartsStyle({
  tab: {
    borderBottom: "solid 1px",
    borderBottomColor: "dark.70",
    _selected: {
      color: "green.500",
      borderBottomColor: "green.500",
      borderBottomWidth: 3,
    },
  },
  tablist: {},
  tabpanel: {},
});

export const Tabs = defineMultiStyleConfig({
  variants: { primary },
  defaultProps: {
    variant: "primary",
  },
});
