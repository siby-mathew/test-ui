import { useMutation } from "@tanstack/react-query";
import apiConfig from "@utils/api";
import axios from "axios";
import { QueryKeys } from "src/types";

export const usePinataToken = () => {
  return useMutation<string | boolean>({
    mutationFn: async () => {
      if (import.meta.env.MODE === "development") {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YjUxYzAwNi04MzEzLTQ2NGUtYWQyNi0wZmU0NmFhYTQ5YjgiLCJlbWFpbCI6InNpYnlAc29sbWFpbC5zbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YWY3NGZjZjg4NzkxYmYxODI4YSIsInNjb3BlZEtleVNlY3JldCI6Ijg2OTY3NDhkZDY4MjkzOTAwMWM4N2VjNWNkN2ZjNWRhZWJlYzU2MDE1MjU0YzIzZTQ4MzdjMDFiZDYwMjQ5OTUiLCJleHAiOjE3ODY2OTcwMjZ9.YGi14oOK7laG0UXjDVXpCGBAX4jMvLoc_xopTDbTcTY";
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
