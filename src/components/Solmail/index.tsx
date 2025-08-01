import { Flex, IconButton, Spinner, SlideFade } from "@chakra-ui/react";
import { Inbox, type InboxRef } from "@components/Inbox";
import { MailPreview } from "@components/MailPreview";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { useRef, useState } from "react";
import { TbReload } from "react-icons/tb";
export const Solmail: React.FC = () => {
  const { context, id } = useMailBoxContext();
  const [isPending, setStatus] = useState<boolean>(!1);
  const inbox = useRef<InboxRef>(null);

  const onRefresh = () => {
    if (!isPending && inbox && inbox.current) {
      inbox.current.refresh();
    }
  };
  return (
    <Flex w="100%" direction={"row"}>
      <Flex
        direction={"column"}
        width={{ base: "100%", md: "350px" }}
        bg="surface.400"
        borderRight={"solid 1px"}
        borderRightColor={"surface.400"}
        borderBottomLeftRadius={21}
        display={{
          base: id ? "none" : "flex",
        }}
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
          </Flex>
        </Flex>
        <Flex flex={"auto"} position={"relative"}>
          <Flex position={"absolute"} inset={0}>
            <Flex
              position={"absolute"}
              right={0}
              left={0}
              top={5}
              alignItems={"center"}
              sx={{
                "> div": {
                  width: "100%",
                },
              }}
            >
              <SlideFade in={isPending} unmountOnExit offsetY={"-20px"}>
                <Flex justifyContent={"center"} alignItems={"center"} w="100%">
                  <Flex
                    bg="green.500"
                    zIndex={1}
                    borderRadius={15}
                    px={2}
                    py={"3px"}
                    alignItems={"center"}
                    mx="auto"
                    display={"inline-flex"}
                    color={"light.100"}
                    fontSize={14}
                  >
                    Updating
                    <Spinner mx={1} size={"sm"} />
                  </Flex>
                </Flex>
              </SlideFade>
            </Flex>

            <CustomScrollbarWrapper>
              <Inbox ref={inbox} onStatusChange={setStatus} />
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flex={"auto"}
        display={{
          base: id ? "flex" : "none",
          md: "flex",
        }}
      >
        <MailPreview />
      </Flex>
    </Flex>
  );
};
