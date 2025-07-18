import { useGetProgramInstance } from "./useGetProgramInstance";
import IDL from "@integrations/idl/solmail/solmail.json";
import type { Solmail } from "@integrations/idl/solmail/solmail";

export const SOLMAIL_PROGRAM_ID = import.meta.env.VITE_SOLMAIL_PROGRAM_ID;
export const useGetMailProgramInstance = () => {
  return useGetProgramInstance<Solmail>(IDL as Solmail, SOLMAIL_PROGRAM_ID);
};
