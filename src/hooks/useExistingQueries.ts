import { useLocation } from "@tanstack/react-router";

export const useExistingQueries = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  return {
    query:
      `${query && Object.keys(query).length > 0 ? searchParams.toString() : ""}`.trim(),
    params: {
      ...query,
    },
  };
};
