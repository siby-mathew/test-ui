import { CustomSkeleton } from "@components/CustomSkeleton";
import { useUsernameById } from "@hooks/useUsernames";
import { shortenPrincipalId } from "@utils/string";

export const UserDisplayName: React.FC<{ address: string }> = ({ address }) => {
  const { username, address: addr, isLoading } = useUsernameById(address);
  return (
    <CustomSkeleton isLoading={isLoading}>
      <>{username || shortenPrincipalId(addr ?? "")}</>
    </CustomSkeleton>
  );
};
