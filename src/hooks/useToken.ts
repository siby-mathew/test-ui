import { tokens } from "@const/tokens";
import type { Token } from "src/types";

export const useToken = (id: string | undefined) => {
  return (tokens.find((token) => id && token.address === id.toString()) ??
    tokens[0]) as Token;
};
