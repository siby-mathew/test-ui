import { Flex } from "@chakra-ui/react";
import { Composer } from "@components/Composer";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import { useSigner } from "@hooks/useSigner";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const UserLayout: React.FC = () => {
  const { isAuthenticating, isAuthenticated, requestSignIn } = useSigner();
  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      requestSignIn();
    }
  }, [isAuthenticated, isAuthenticating, requestSignIn]);

  return (
    <Flex w="100%" direction={"row"}>
      <Flex as={"aside"} w="300px" maxW={"300px"}>
        <Sidebar />
      </Flex>
      <Flex
        bg="surface.300"
        flex={"auto"}
        borderLeftRadius={20}
        direction={"column"}
        boxShadow={`-1px 0px 0px 0px #181818`}
      >
        <Flex
          as={"nav"}
          borderBottom={"solid 1px"}
          borderBottomColor={"#1a1a1a"}
        >
          <Navbar />
        </Flex>
        <Flex data-body flex={"auto"}>
          {isAuthenticated && (
            <>
              <Composer />
              <Outlet />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
