import { Box, chakra, Flex, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Attachment } from "@components/Attachment";
import { Avatar } from "@components/Avatar";
import { CustomSkeleton } from "@components/CustomSkeleton";
import { SolanaPayRequest } from "@components/SolanaPayRequest";
import { UserDisplayName } from "@components/UserDisplayName";

import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useMailStatus } from "@hooks/useMailStatus";
import { Link } from "@tanstack/react-router";
import { trim } from "@utils/string";
import { formatTime } from "@utils/time";

import { MailBoxLabels, type FormattedMailBox } from "src/types";

export const MailCard: React.FC<FormattedMailBox> = ({
  from,
  subject,
  createdAt,
  id,
  to,
}) => {
  const { isRead } = useMailStatus(id, Number(createdAt) * 1000);
  const { context, id: contextId } = useMailBoxContext();
  const {
    textContent,
    hasSmartView,
    isLoading: isMailBoxLoading,
    isInternalMail,
  } = useMailBody(id, context);
  const addres =
    context !== MailBoxLabels.outbox ? from?.toString() : to?.toString();
  const isActive = contextId && contextId === id;

  const hasPendingState = isMailBoxLoading;
  return (
    <Box
      p={2}
      w="full"
      pl="50px"
      position={"relative"}
      cursor={"pointer"}
      transition={"all ease .2s"}
      borderRadius={10}
      fontSize={14}
      as={LinkBox}
      fontWeight={!isRead ? "bold" : ""}
      opacity={!isRead ? 1 : 0.5}
      pr={5}
      bg={isActive ? "surface.800" : ""}
      _hover={{
        bg: "surface.800",
      }}
    >
      <Avatar
        top={2}
        left={"10px"}
        name={addres}
        isInternalMail={isInternalMail}
      />
      <Flex mb={"2px"} justifyContent={"space-between"}>
        <Flex>
          <UserDisplayName address={addres} />
        </Flex>
        <Flex fontSize={12}>{formatTime(Number(createdAt) * 1000)}</Flex>
      </Flex>
      <Box
        maxW={"100%"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
      >
        <CustomSkeleton isLoading={isMailBoxLoading}>
          <chakra.span
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            w={"100%"}
            whiteSpace={"nowrap"}
          >
            {subject}
          </chakra.span>
        </CustomSkeleton>
      </Box>
      <Box fontSize={12}>
        <CustomSkeleton isLoading={hasPendingState}>
          <chakra.span
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            w={"100%"}
            whiteSpace={"nowrap"}
          >
            {trim(textContent, hasSmartView ? 30 : 60, "...", "(No content)")}
          </chakra.span>
        </CustomSkeleton>
      </Box>
      {hasSmartView && <SmartView id={id} />}
      <LinkOverlay as={Link} to={`/u/solmail/${context}/${id.toString()}`} />
    </Box>
  );
};
const MAX_ATTACHMENTS_TO_SHOW = 1;
const SmartView: React.FC<{ id: string }> = ({ id }) => {
  const { context } = useMailBoxContext();
  const { attachments, payments } = useMailBody(id, context);
  return (
    <Flex
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      alignItems={"center"}
      mt={1}
    >
      {payments && payments.length > 0 && payments[0] && (
        <SolanaPayRequest
          amount={payments[0]?.amount}
          token={payments[0]?.token}
        />
      )}

      {attachments.length > 0 &&
        attachments
          .slice(0, MAX_ATTACHMENTS_TO_SHOW)
          .map((attachment, index) => {
            return (
              <Attachment
                name={attachment.name}
                key={attachment.name + index}
              />
            );
          })}

      {attachments && attachments.length > MAX_ATTACHMENTS_TO_SHOW && (
        <Flex
          bg="surface.600"
          fontSize={12}
          p="3px"
          px="8px"
          borderRadius={"5"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          +1
        </Flex>
      )}
    </Flex>
  );
};
