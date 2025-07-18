import { chakra, Flex } from "@chakra-ui/react";
import { Avatar } from "@components/Avatar";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { shortenPrincipalId } from "@utils/string";
import { format } from "@utils/time";
import { MailBoxLabels } from "src/types";

export const MailPreviewHeader: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const label = context !== MailBoxLabels.outbox ? "From" : "To";
  const { mail } = useMailBody(id, context);
  const address =
    context !== MailBoxLabels.outbox
      ? mail?.from?.toString()
      : mail?.to?.toString();
  return (
    <Flex px={5} py={3} w="full" direction={"row"} gap={3}>
      <Flex boxSize={"40px"}>
        <Avatar boxSize={"40px"} name="jk" position={"initial"} />
      </Flex>
      <Flex direction={"column"} flex={"auto"}>
        <Flex>
          <chakra.span mr={1}>{label}</chakra.span>
          <chakra.span>{`<${shortenPrincipalId(address, 8, 8)}>`}</chakra.span>
        </Flex>
        <Flex opacity={0.6} fontSize={13}>
          {format(Number(mail?.createdAt ?? 0) * 1000)}
        </Flex>
      </Flex>
    </Flex>
  );
};
