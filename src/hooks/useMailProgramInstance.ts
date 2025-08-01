import { useGetProgramInstance } from "./useGetProgramInstance";
import IDL from "@integrations/idl/solmail/solmail.json";
import type { Solmail } from "@integrations/idl/solmail/solmail";

export const useGetMailProgramInstance = () => {
  return useGetProgramInstance<Solmail>(IDL as Solmail);
};
