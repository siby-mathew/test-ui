import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import apiConfig, { type AxiosResponse } from "../utils/api";
import { QueryKeys } from "src/types";

const fetchEncryptionKey = async (id: string) => {
  try {
    const [user0, user1] = (id as string).split(":");
    const { data }: AxiosResponse<{ g2wBMZxrwz: string }> = await apiConfig<{
      g2wBMZxrwz: string;
    }>(
      "generate-key",
      "POST",
      {
        user0: user0.toString(),
        user1: user1.toString(),
      },
      null,
      true
    );
    if (data && data.g2wBMZxrwz) {
      return data.g2wBMZxrwz;
    } else {
      throw "";
    }
  } catch {
    throw "Failed to generate key";
  }
};
export const useEncryptionKey = (id: string) => {
  const { data, isLoading } = useQuery({
    queryFn: id && id.trim() ? () => fetchEncryptionKey(id) : skipToken,
    queryKey: [QueryKeys.ENCRYPTION_KEY, id],
    staleTime: Infinity,
    refetchOnWindowFocus: !1,
  });
  return {
    data,
    isLoading,
  };
};

export const useGenerateEncryptionKey = () => {
  return useMutation({
    mutationFn: (id: string) => fetchEncryptionKey(id),
    mutationKey: [QueryKeys.ENCRYPTION_KEY],
  });
};
