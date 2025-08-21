export const colors = {
  dark: {
    "100": "#050810",
    "200": "#070a13",
    "300": "#090c16",
    "400": "#0b0f18",
    "500": "#0d111b",
    "600": "#0f131d",
    "700": "#11151f",
    "800": "#12161f",
    "900": "#14171e",
  },

  light: {
    900: "#ffffffff",
    800: "#e4e4e4",
    700: "#f5f5f5",
    600: "#f8fafd",
    500: "#efefef",
    400: "#e9e9e9",
    300: "#ebebeb",
    200: "#e7e7e7",
    100: "#fff",
  },
  solana: {
    start: "#f087ff",
    middle: "#a256ff",
    end: "#1efa9b",
  },
};
export const semanticTokens = {
  colors: {
    solana: `linear-gradient(135deg, ${colors.solana.start}, ${colors.solana.middle},${colors.solana.end})`,
    surface: {
      100: {
        default: "light.900",
        _dark: "dark.100",
      },
      200: {
        default: "light.800",
        _dark: "dark.200",
      },
      300: {
        default: "light.700",
        _dark: "dark.300",
      },
      400: {
        default: "light.600",
        _dark: "dark.400",
      },
      500: {
        default: "light.500",
        _dark: "dark.500",
      },
      600: {
        default: "light.400",
        _dark: "dark.600",
      },
      700: {
        default: "light.300",
        _dark: "dark.700",
      },
      800: {
        default: "light.200",
        _dark: "dark.800",
      },
      900: {
        default: "light.100",
        _dark: "dark.900",
      },
    },
  },
};
