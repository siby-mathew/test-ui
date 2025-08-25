import { TokenAssetsResponse } from "src/types/asset";
import { useHeliusApi } from "./useHeliusApi";

export const useHeliusAssetsBatch = (assets: string[] = []) => {
  const { data, isLoading } = useHeliusApi<TokenAssetsResponse>(
    {
      method: "getAssetBatch",
      params: {
        ids: assets,
      },
    },
    {
      enabled: assets && assets.length > 0,
    }
  );

  return {
    data,
    isLoading,
  };
};
