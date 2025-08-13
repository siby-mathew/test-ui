import { PINATA_JWT } from "@const/config";
import { useMutation } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import axios from "axios";
import { QueryKeys } from "src/types";

export const usePinataToken = () => {
  return useMutation<string | boolean>({
    mutationFn: async () => {
      if (import.meta.env.MODE === "development") {
        return PINATA_JWT;
      }
      const { data } = await apiConfig<{ token: string }>(
        "/generate-pinata-token",
        "GET",
        {},
        {},
        !0
      );
      if (data && data.token) {
        return data.token;
      }
      return !1;
    },
    mutationKey: [QueryKeys.MUTATION_PINATA_TOKEN],
  });
};

type PinataUploadResponse = {
  GroupId: string | null;
  ID: string;
  IpfsHash: string;
  Keyvalues: Record<string, string | number>;
  MimeType: string;
  Name: string;
  NumberOfFiles: number;
  PinSize: number;
  Timestamp: string;
};
export const usePinataUploader = () => {
  const { mutateAsync: getPinataToken } = usePinataToken();
  return useMutation<
    PinataUploadResponse | undefined,
    unknown,
    { data: FormData }
  >({
    mutationKey: [QueryKeys.MUTATION_UPLOAD_TO_PINATA],
    mutationFn: async ({ data }) => {
      const token = await getPinataToken();
      const { data: res } = await axios.post(
        import.meta.env.VITE_PINATA_PPINNING_SERVICE_URL,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res;
    },
  });
};
