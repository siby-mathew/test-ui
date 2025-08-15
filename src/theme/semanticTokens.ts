export const colors = {
  dark: {
    // 50: "#030914",
    // 60: "#19191a",
    // 70: "#242D3C",
    // 100: "#0f0f0f",
    // 200: "#0a0a0a",
    // 300: "#141414",
    // 400: "#1f1f1f",
    // 500: "#2a2a2a",
    // 600: "#333333",
    // 700: "#404040",
    // 800: "#4d4d4d",
    // 900: "#5a5a5a",

    "100": "#050810",
    "200": "#070a13",
    "300": "#090c16",
    "400": "#0b0f18",
    "500": "#0d111b",
    "600": "#0f131d",
    "700": "#11151f",
    "800": "#12161f",
    "900": "#14171e",

    // 100: "#05070a", // almost black, subtle blue tint
    // 200: "#080b10",
    // 300: "#0c1018",
    // 400: "#101621",
    // 500: "#151b2a", // midpoint — dark desaturated navy
    // 600: "#1a2133",
    // 700: "#20273d",
    // 800: "#272e47",
    // 900: "#2e3552", // darkest usable blue-gray
  },

  // light: {
  //   900: "#e10a0aff",
  //   800: "#3a0464ff",
  //   700: "#bdffbeff",
  //   600: "yellow",
  //   500: "#f00",
  //   400: "#a806deff",
  //   300: "#0805bbff",
  //   200: "#0dc916ff",
  //   100: "#5c0303ff",
  // },
  light: {
    900: "#ffffffff",
    800: "#3a0464ff",
    700: "#f5f5f5",
    600: "#f8fafd",
    500: "#efefef",
    400: "#a806deff",
    300: "#ebebeb",
    200: "#0dc916ff",
    100: "#fff", //#5c0303ff
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
