import { Box, Fade, Flex, Icon } from "@chakra-ui/react";
import { MailMeta } from "@components/MailMeta";
import { MailPreviewAttachments } from "@components/MailPreviewAttchments";
import { MailPreviewHeader } from "@components/MailPreviewHeader";
import { PaymentRequests } from "@components/PaymentRequest";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { useMailBody } from "@hooks/useMailBody";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useMailStatus } from "@hooks/useMailStatus";
import { useEffect } from "react";
import { RiChatSmileFill } from "react-icons/ri";

export const MailPreview: React.FC = () => {
  const { id, context } = useMailBoxContext();
  const { addItem } = useMailStatus(id as string);
  const { subject, content, textContent, attachments, isLoading, payments } =
    useMailBody(id && id !== "all" ? id : undefined, context);

  useEffect(() => {
    if (id) {
      addItem(id);
    }
  }, [addItem, id]);
  return (
    <Flex w="full" direction={"column"}>
      {id && !isLoading && (
        <>
          <Flex
            data-header
            bg="surface.300"
            borderBottom="solid 1px"
            borderBottomColor={"surface.600"}
          >
            <MailPreviewHeader />
          </Flex>
          <Flex flex={"auto"} direction={"column"} position={"relative"}>
            <Flex position={"absolute"} inset={0}>
              <CustomScrollbarWrapper>
                <Fade in key={id}>
                  <Box w="full" mt={4} px={5}>
                    <Box maxW="600" w="full" mx="auto">
                      <Box my={2} fontWeight={"medium"} fontSize={18}>
                        {subject}
                      </Box>
                      {textContent && (
                        <Box
                          sx={{
                            "*": {
                              maxWidth: "100% !important",
                              color: "light.100",
                            },

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
                      {payments && payments.length > 0 && <PaymentRequests />}
                      {attachments && attachments.length > 0 && (
                        <MailPreviewAttachments />
                      )}
                      <MailMeta />
                    </Box>
                  </Box>
                </Fade>
              </CustomScrollbarWrapper>
            </Flex>
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
