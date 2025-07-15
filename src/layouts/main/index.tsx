import { Box, Flex } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const AppMainLayout: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(!1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(!0);
    }, 1500);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  if (!status || !ready) {
    return <Box>Loading...</Box>;
  }

  if (ready && !authenticated) {
    navigate({ to: "/" });
  } else {
    navigate({ to: "/u/solmail/inbox/all" });
  }
  return (
    <Flex minH={"100vh"} w="full">
      <Outlet />
    </Flex>
  );
};
