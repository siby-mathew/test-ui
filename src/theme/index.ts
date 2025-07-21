import { extendTheme } from "@chakra-ui/react";
import { colors, semanticTokens } from "./semanticTokens";
import { Skeleton } from "./components/Skeleton";
import { Modal } from "./components/Modal";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

export const AppTheme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: true },
  fonts: {
    body: `"Inter", sans-serif`,
  },
  semanticTokens,
  colors,
  styles: {
    global: () => ({
      body: {
        bg: "surface.100",
        fontSize: 15,
        color: "#b6b6b6",
      },
    }),
  },
  components: {
    Skeleton,
    Modal,
    Input,
    Button,
  },
});
