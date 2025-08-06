import { Flex } from "@chakra-ui/react";
import { DownloadbleAttachment } from "@components/DownloadbleAttachment";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";

export const MailPreviewAttachments: React.FC = () => {
  const { id, context } = useMailBoxContext();
  const { attachments, mail } = useMailBody(id, context);
  return (
    <Flex direction={"row"} flexWrap={"wrap"} gap={3} mt={5}>
      {attachments.map((attachment, index) => {
        return (
          <DownloadbleAttachment
            name={attachment.name}
            path={attachment.src}
            key={attachment.name + index}
            version={mail?.version ?? ""}
          />
        );
      })}
    </Flex>
  );
};
