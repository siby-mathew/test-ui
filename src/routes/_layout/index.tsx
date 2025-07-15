import { Flex } from "@chakra-ui/react";
import { Inbox } from "@components/Inbox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex h="100%">
      <Inbox />
    </Flex>
  );
}
