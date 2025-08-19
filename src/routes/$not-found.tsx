import { Flex } from "@chakra-ui/react";
import { PageNotFound } from "@screens/404";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$not-found")({
  component: function () {
    return (
      <Flex minH={"100%"} w="100%">
        <PageNotFound />
      </Flex>
    );
  },
});
