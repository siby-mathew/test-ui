import { tokens } from "@const/tokens";
import type { Token } from "src/types";

export const useToken = (id: string) => {
  return (tokens.find((token) => token.address === id.toString()) ??
    tokens[0]) as Token;
};
