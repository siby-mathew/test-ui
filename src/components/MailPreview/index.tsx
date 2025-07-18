import { Box, Fade, Flex, Icon } from "@chakra-ui/react";
import { MailMeta } from "@components/MailMeta";
import { MailPreviewAttachments } from "@components/MailPreviewAttchments";
import { MailPreviewHeader } from "@components/MailPreviewHeader";
import { PaymentRequests } from "@components/PaymentRequest";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { RiChatSmileFill } from "react-icons/ri";

export const MailPreview: React.FC = () => {
  const { id, context } = useMailBoxContext();
  const { subject, content, textContent, attachments, isLoading, payments } =
    useMailBody(id && id !== "all" ? id : undefined, context);
  return (
    <Flex w="full" direction={"column"}>
      {id && !isLoading && (
        <>
          <Flex data-header bg="surface.300">
            <MailPreviewHeader />
          </Flex>
          <Flex flex={"auto"} direction={"column"}>
            <Fade in key={id}>
              <Box w="full">
                <Box maxW="600" w="full" mx="auto">
                  <Box my={2} fontWeight={"medium"} fontSize={18}>
                    {subject}
                  </Box>
                  {textContent && (
                    <Box
                      sx={{
                        h1: {
                          fontSize: "2em",
                        },
                        h2: {
                          fontSize: "1.5em",
                        },
                        h3: {
                          fontSize: "1.17em",
                        },
                        ol: {
                          ml: "15px",
                          my: 3,
                        },
                        p: {
                          my: 1,
                        },
                      }}
                      dangerouslySetInnerHTML={{ __html: content }}
                      color={"surface.900"}
                    />
                  )}
                  {payments && <PaymentRequests />}
                  {attachments && <MailPreviewAttachments />}
                  <MailMeta />
                </Box>
              </Box>
            </Fade>
          </Flex>
        </>
      )}

      {!id && (
        <Flex
          h="full"
          justifyContent={"center"}
          alignItems={"center"}
          minH={"50vh"}
          direction={"column"}
        >
          <Flex fontSize={50} mb={2}>
            <Icon fontSize={25} as={RiChatSmileFill} />
          </Flex>
          <Flex opacity={0.5}>No Mail Selected</Flex>
        </Flex>
      )}
    </Flex>
  );
};
