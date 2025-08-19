import { chakra, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { Avatar } from "@components/Avatar";
import { ClipboardText } from "@components/ClipboardText";
import { MailOptionRenderer } from "@components/MailOptionRenderer";
import { DOMAINS } from "@const/domain";
import { useComposer } from "@hooks/useComposer";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useLabelIndexUpdate } from "@hooks/useMailIndexUpdate";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { MailShareTypes } from "@state/index";
import { shortenPrincipalId } from "@utils/string";
import { format } from "@utils/time";

import { IoIosShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiReplyFill, RiSpam3Fill } from "react-icons/ri";
import { MailBoxLabels, MailLabelIndex } from "src/types";

export const MailPreviewHeader: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const { onOpen } = useComposer();
  const { isInternalMail } = useMailBody(id, context);
  const { isPending, mutateAsync } = useLabelIndexUpdate(id ?? "");

  const label = context !== MailBoxLabels.outbox ? "From" : "To";
  const { mail } = useMailBody(id, context);
  const address =
    context !== MailBoxLabels.outbox
      ? mail?.from?.toString()
      : mail?.to?.toString();
  const { displayName } = useGetLinkedUsernameById(address);
  const onStatusUpdate = async (status: MailLabelIndex) => {
    await mutateAsync({ index: status });
  };
  const mailConfig = () => {
    return {
      thread: mail?.from?.toString() ?? "",
      ref: mail?.id?.toString() ?? "",
    };
  };
  const onReplay = () => {
    onOpen({
      ...mailConfig(),
      action: MailShareTypes.reply,
    });
  };

  const onForward = () => {
    onOpen({
      ...mailConfig(),
      action: MailShareTypes.forward,
    });
  };
  return (
    <Flex px={5} py={"7px"} w="full" direction={"row"} gap={3}>
      <Flex boxSize={"40px"}>
        <Avatar
          boxSize={"40px"}
          name={address?.toString() ?? ""}
          position={"initial"}
          isInternalMail={isInternalMail}
        />
      </Flex>
      <Flex direction={"column"} flex={"auto"}>
        <Flex>
          <chakra.span mr={1}>{label}</chakra.span>

          <ClipboardText
            textToCopy={displayName}
            trim={!1}
          >{`<${shortenPrincipalId(displayName, 4, DOMAINS.DEFAULT.length)}>`}</ClipboardText>
        </Flex>
        <Flex opacity={0.6} fontSize={13}>
          {format(Number(mail?.createdAt ?? 0) * 1000)}
        </Flex>
      </Flex>
      <Flex gap={1} display={{ base: "none", md: "flex" }}>
        <MailOptionRenderer
          renderWhen={[MailBoxLabels.inbox, MailBoxLabels.spam]}
        >
          <Tooltip label="Reply" placement="auto">
            <IconButton
              size={"sm"}
              aria-label="Reply"
              icon={<RiReplyFill />}
              onClick={onReplay}
            />
          </Tooltip>
        </MailOptionRenderer>

        <MailOptionRenderer
          renderWhen={[
            MailBoxLabels.inbox,
            MailBoxLabels.outbox,
            MailBoxLabels.trash,
            MailBoxLabels.spam,
          ]}
        >
          <Tooltip label="Forward" placement="auto">
            <IconButton
              size={"sm"}
              aria-label="Forward"
              icon={<IoIosShareAlt />}
              onClick={onForward}
            />
          </Tooltip>
        </MailOptionRenderer>

        <MailOptionRenderer
          renderWhen={[
            MailBoxLabels.inbox,
            MailBoxLabels.outbox,
            MailBoxLabels.spam,
          ]}
        >
          <Tooltip placement="auto" label="Delete" isDisabled={isPending}>
            <IconButton
              onClick={() => onStatusUpdate(MailLabelIndex.trash)}
              size={"sm"}
              aria-label="Delete"
              icon={<MdDelete />}
              disabled={isPending}
            />
          </Tooltip>
        </MailOptionRenderer>

        <MailOptionRenderer
          renderWhen={[MailBoxLabels.inbox, MailBoxLabels.trash]}
        >
          <Tooltip placement="auto" label="Mark as spam" isDisabled={isPending}>
            <IconButton
              onClick={() => onStatusUpdate(MailLabelIndex.spam)}
              size={"sm"}
              aria-label="Spam"
              icon={<RiSpam3Fill />}
              disabled={isPending}
            />
          </Tooltip>
        </MailOptionRenderer>
      </Flex>
    </Flex>
  );
};
