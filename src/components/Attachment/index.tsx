import { chakra, Icon } from "@chakra-ui/react";
import { getFileConfig } from "@utils/file";
import { shortenPrincipalId } from "@utils/string";

export const Attachment: React.FC<{ name: string }> = ({ name }) => {
  const config = getFileConfig(name);
  return (
    <chakra.span mr={2} display={"inline-flex"} alignItems={"center"}>
      <Icon as={config.icon} color={config.color} mr={1} />
      <chakra.span>{shortenPrincipalId(name)}</chakra.span>
    </chakra.span>
  );
};
