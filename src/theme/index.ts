import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { colors, semanticTokens } from "./semanticTokens";
import { Skeleton } from "./components/Skeleton";
import { Modal } from "./components/Modal";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Tabs } from "./components/Tab";
import { Table } from "./components/Table";

export const AppTheme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: true },
  fonts: {
    body: `"Inter", sans-serif`,
  },
  semanticTokens,
  colors,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "surface.100",
        fontSize: 15,
        color: mode("rgb(78 88 99)", "#b6b6b6")(props),
      },
      ".Toastify__toast-theme--dark": {
        background: "#101527ab",
        color: "var(--toastify-text-color-dark)",
        "backdrop-filter": "blur(10px)",
        border: "solid 1px #161927",
        borderRadius: "20px",
      },
      ".Toastify__close-button>svg": {
        width: "11px !important",
      },
    }),
  },
  components: {
    Skeleton,
    Modal,
    Input,
    Button,
    Tabs,
    Table,
  },
});
