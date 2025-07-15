import { chakra, Icon, useClipboard } from "@chakra-ui/react";
import { shortenPrincipalId } from "@utils/string";
import { FaCopy } from "react-icons/fa6";
import { TbCopyCheckFilled } from "react-icons/tb";

type ClipboardTextProps = {
  children?: string;
  textToCopy?: string;
  trim?: boolean;
};
export const ClipboardText: React.FC<ClipboardTextProps> = ({
  children,
  trim = !0,
  textToCopy,
}) => {
  const { onCopy, hasCopied } = useClipboard(textToCopy || children || "");
  return (
    <chakra.span
      cursor={"pointer"}
      onClick={onCopy}
      display={"inline-flex"}
      alignItems={"center"}
      transition={"all ease .2s"}
      _hover={{
        opacity: 0.8,
      }}
    >
      {trim ? shortenPrincipalId(children) : children}
      <Icon ml={2} as={!hasCopied ? FaCopy : TbCopyCheckFilled} />
    </chakra.span>
  );
};
