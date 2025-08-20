import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import { MailCard } from "@components/MailCard";
import { useGetInbox } from "@hooks/useGetInbox";
import { useMailBoxContext } from "@hooks/useMailBoxContext";
import isFunction from "lodash/isFunction";

export interface InboxRef {
  refresh: () => void;
}

export const Inbox = forwardRef<
  InboxRef,
  {
    onStatusChange?: (s: boolean) => void;
  }
>(({ onStatusChange }, ref) => {
  const { context } = useMailBoxContext();
  const { mail, isLoading, refetch, isPending } = useGetInbox(context);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      refetch();
    },
  }));

  useEffect(() => {
    if (isFunction(onStatusChange)) {
      onStatusChange(isPending);
    }
  }, [isPending, onStatusChange]);

  return (
    <Box w="100%">
      <Box pt={2}>
        {isLoading && (!mail || !mail.length) && (
          <Flex minH={"50vh"} justifyContent={"center"} alignItems={"center"}>
            <Spinner />
          </Flex>
        )}

        {mail && mail.length > 0 && (
          <VStack w="100%" overflow={"hidden"} h="100%" px={2} gap={2}>
            {mail.map((item) => (
              <MailCard key={`${context}_${item.id?.toString()}`} {...item} />
            ))}
          </VStack>
        )}

        {!isLoading && (!mail || !mail.length) && (
          <Flex
            alignItems={"center"}
            opacity={0.5}
            justifyContent={"center"}
            minH={"38vh"}
          >
            Mail list is currently empty.
          </Flex>
        )}
      </Box>
    </Box>
  );
});
