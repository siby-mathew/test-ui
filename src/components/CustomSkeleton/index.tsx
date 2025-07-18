import { chakra, Skeleton } from "@chakra-ui/react";
import { useMemo, type ReactNode } from "react";

export const CustomSkeleton: React.FC<{
  isLoading: boolean;
  children: ReactNode;
}> = ({ children, isLoading }) => {
  const width = useMemo(
    () => Math.min(100, Math.floor(Math.random() * 100) + 20),
    []
  );
  return (
    <chakra.span position={"relative"} w="full" display={"inline-flex"}>
      {isLoading && (
        <Skeleton position={"absolute"} inset={"1px"} w={`${width}%`} />
      )}
      {!isLoading ? children : <chakra.span opacity={0}>LOADINIG</chakra.span>}
    </chakra.span>
  );
};
