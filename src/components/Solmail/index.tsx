import { Button, Fade, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { Inbox, type InboxRef } from "@components/Inbox";
import { MailPreview } from "@components/MailPreview";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { useComposer } from "@hooks/useComposer";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useRef, useState } from "react";
import { TbReload } from "react-icons/tb";
export const Solmail: React.FC = () => {
  const { context } = useMailBoxContext();
  const [isPending, setStatus] = useState<boolean>(!1);
  const inbox = useRef<InboxRef>(null);
  const { onOpen } = useComposer();
  const onRefresh = () => {
    if (!isPending && inbox && inbox.current) {
      inbox.current.refresh();
    }
  };
  return (
    <Flex w="100%" direction={"row"}>
      <Flex
        direction={"column"}
        width={"350px"}
        bg="surface.400"
        borderRight={"solid 1px"}
        borderRightColor={"surface.400"}
        borderBottomLeftRadius={21}
      >
        <Flex
          borderBottom={"solid 1px"}
          borderBottomColor={"surface.500"}
          px={5}
          py={3}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Flex
            fontWeight={"medium"}
            fontSize={18}
            textTransform={"capitalize"}
          >
            {context}
          </Flex>
          <Flex>
            <IconButton
              bg="transparent !important"
              aria-label="Refresh"
              icon={<TbReload />}
              size={"sm"}
              onClick={onRefresh}
              _hover={{
                opacity: 0.5,
              }}
            />
            <Button bg="green.500 !important" onClick={onOpen} size={"sm"}>
              Compose
            </Button>
          </Flex>
        </Flex>
        <Flex flex={"auto"} position={"relative"}>
          <Flex position={"absolute"} inset={0}>
            <Fade in={isPending}>
              <Flex
                position={"absolute"}
                right={0}
                left={0}
                top={5}
                alignItems={"center"}
              >
                <Flex
                  bg="green.500"
                  zIndex={1}
                  borderRadius={15}
                  px={2}
                  py={"3px"}
                  alignItems={"center"}
                  mx="auto"
                  display={"inline-flex"}
                >
                  Updating
                  <Spinner mx={1} size={"sm"} />
                </Flex>
              </Flex>
            </Fade>

            <CustomScrollbarWrapper>
              <Inbox ref={inbox} onStatusChange={setStatus} />
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
      </Flex>
      <Flex flex={"auto"} position={"relative"}>
        <Flex position={"absolute"} inset={0}>
          <CustomScrollbarWrapper>
            <MailPreview />
          </CustomScrollbarWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
};
