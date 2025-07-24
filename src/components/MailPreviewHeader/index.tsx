import { chakra, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { Avatar } from "@components/Avatar";
import { ClipboardText } from "@components/ClipboardText";
import { useComposer } from "@hooks/useComposer";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useLabelIndexUpdate } from "@hooks/useMailIndexUpdate";
import { shortenPrincipalId } from "@utils/string";
import { format } from "@utils/time";

import { IoIosShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiSpam3Fill } from "react-icons/ri";
import { MailBoxLabels, MailLabelIndex } from "src/types";

export const MailPreviewHeader: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const { onOpen } = useComposer();
  const { isPending, mutateAsync } = useLabelIndexUpdate(id ?? "");
  const label = context !== MailBoxLabels.outbox ? "From" : "To";
  const { mail } = useMailBody(id, context);
  const address =
    context !== MailBoxLabels.outbox
      ? mail?.from?.toString()
      : mail?.to?.toString();

  const onStatusUpdate = async (status: MailLabelIndex) => {
    await mutateAsync({ index: status });
  };

  const onReplay = () => {
    onOpen({
      thread: mail?.from?.toString() ?? "",
      ref: mail?.id?.toString() ?? "",
    });
  };
  return (
    <Flex px={5} py={"7px"} w="full" direction={"row"} gap={3}>
      <Flex boxSize={"40px"}>
        <Avatar boxSize={"40px"} name="jk" position={"initial"} />
      </Flex>
      <Flex direction={"column"} flex={"auto"}>
        <Flex>
          <chakra.span mr={1}>{label}</chakra.span>
          {/* <chakra.span></chakra.span> */}
          <ClipboardText
            textToCopy={address}
            trim={!1}
          >{`<${shortenPrincipalId(address, 8, 8)}>`}</ClipboardText>
        </Flex>
        <Flex opacity={0.6} fontSize={13}>
          {format(Number(mail?.createdAt ?? 0) * 1000)}
        </Flex>
      </Flex>
      <Flex gap={1}>
        {context !== MailBoxLabels.outbox && (
          <Tooltip label="Reply" placement="auto">
            <IconButton
              size={"sm"}
              aria-label="Reply"
              icon={<IoIosShareAlt />}
              onClick={onReplay}
            />
          </Tooltip>
        )}
        {context === MailBoxLabels.inbox && (
          <>
            <Tooltip placement="auto" label="Delete" isDisabled={isPending}>
              <IconButton
                onClick={() => onStatusUpdate(MailLabelIndex.trash)}
                size={"sm"}
                aria-label="Delete"
                icon={<MdDelete />}
                disabled={isPending}
              />
            </Tooltip>
            <Tooltip
              placement="auto"
              label="Mark as spam"
              isDisabled={isPending}
            >
              <IconButton
                onClick={() => onStatusUpdate(MailLabelIndex.spam)}
                size={"sm"}
                aria-label="Spam"
                icon={<RiSpam3Fill />}
                disabled={isPending}
              />
            </Tooltip>
          </>
        )}
      </Flex>
    </Flex>
  );
};
