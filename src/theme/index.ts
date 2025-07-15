import { extendTheme } from "@chakra-ui/react";
import { colors, semanticTokens } from "./semanticTokens";

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
      },
    }),
  },
  components: {},
});
