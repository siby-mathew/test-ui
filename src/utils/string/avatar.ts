// Define valid keys (a-z, 0-9) as a union type
type AvatarChar =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

// Map those characters to string color values
const avatarColors: Record<AvatarChar, string> = {
  a: "#4B0082",
  b: "#2C003E",
  c: "#003366",
  d: "#013220",
  e: "#3B0A45",
  f: "#1A1A64",
  g: "#3C1E1E",
  h: "#223A5E",
  i: "#352d39",
  j: "#154734",
  k: "#512E5F",
  l: "#4A235A",
  m: "#1C2833",
  n: "#402218",
  o: "#0B3D91",
  p: "#3E2723",
  q: "#5D1451",
  r: "#004225",
  s: "#2E1A47",
  t: "#301934",
  u: "#3D2C8D",
  v: "#2F3C7E",
  w: "#592720",
  x: "#3E1F47",
  y: "#0F3057",
  z: "#2E3A59",
  "0": "#4B3621",
  "1": "#1F1A38",
  "2": "#153243",
  "3": "#381D2A",
  "4": "#003B46",
  "5": "#42213D",
  "6": "#2E1A1F",
  "7": "#2D2A32",
  "8": "#183446",
  "9": "#321E3F",
};

export const getAvatarColor = (userAddress: string): string => {
  if (!userAddress || typeof userAddress !== "string") return "#ccc";
  const firstChar = userAddress.trim().toLowerCase().charAt(0) as AvatarChar;
  return avatarColors[firstChar] ?? "#ccc";
};
