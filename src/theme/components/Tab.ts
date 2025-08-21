import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const primary = definePartsStyle(() => ({
  tab: {
    borderBottom: "solid 1px",
    borderBottomColor: "surface.900",
    _selected: {
      color: "green.500",
      borderBottomColor: "green.500",
      borderBottomWidth: 3,
    },
  },
  tablist: {},
  tabpanel: {},
}));

const wallet = definePartsStyle({
  tab: {
    borderBottom: "solid 1px",
    borderBottomColor: "surface.800",
    fontWeight: "normal",
    _selected: {
      color: "green.500",
      borderBottomColor: "green.500",
      borderBottomWidth: 1,
    },
  },
  tablist: {},
  tabpanel: {},
});

export const Tabs = defineMultiStyleConfig({
  variants: { primary, wallet },
  defaultProps: {
    variant: "primary",
  },
});
