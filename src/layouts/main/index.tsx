import { Flex, Image, Link, Tooltip } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import {
  Link as TanstackLink,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import GooglePlay from "@assets/playstore.png";

import { PulseLoader } from "@components/PulseLoader";
import { useExistingQueries } from "@hooks/useExistingQueries";
import LogoFull from "@assets/logo-full.png";
export const AppMainLayout: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(!1);
  const location = useLocation();

  const { query } = useExistingQueries();
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(!0);
    }, 2000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  if (!status || !ready) {
    return (
      <Flex h="100vh">
        <PulseLoader />
      </Flex>
    );
  }

  if (ready && status && authenticated && location.pathname === "/") {
    navigate({ to: `/u/solmail/inbox/all${query ? `?${query}` : ""}` });
  }

  if (ready && !authenticated && location.pathname !== "/") {
    navigate({ to: `/${query ? `?${query}` : ``}` });
  }
  return (
    <Flex minH={"100vh"} w="full" direction={"column"}>
      {location.pathname === "/" && (
        <Flex
          px={5}
          py={3}
          direction={"row"}
          gap={5}
          justifyContent={"space-between"}
        >
          <Flex>
            <Link
              as={TanstackLink}
              display={"inline-flex"}
              to={"/"}
              alignItems={"center"}
            >
              <Image w={140} src={LogoFull} alt="solmail" />
              {/* <chakra.span
                ml={2}
                fontSize={20}
                bg="solana"
                bgClip={"text"}
                fontWeight={"bold"}
              >
                Solmail
              </chakra.span> */}
            </Link>
          </Flex>
          <Flex gap={3} fontWeight={"medium"} alignItems={"center"}>
            Get the app
            <Tooltip label="Coming soon">
              <Flex
                display={"inline-flex"}
                bg="surface.400"
                px={4}
                py={2}
                borderRadius={20}
                cursor={"pointer"}
                transition={"all ease .2s"}
                _hover={{
                  opacity: 0.8,
                }}
              >
                <Image w="120px" src={GooglePlay} />
              </Flex>
            </Tooltip>
          </Flex>
        </Flex>
      )}
      <Flex flex={"auto"}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
