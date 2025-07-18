import { Box, chakra, Flex, Image, Link } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import {
  Link as TanstackLink,
  Outlet,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import GooglePlay from "@assets/playstore.png";
import { config } from "@const/config";
import { PulseLoader } from "@components/PulseLoader";
export const AppMainLayout: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(!1);
  const location = useLocation();
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
    navigate({ to: `/u/solmail/inbox/all` });
  }

  if (ready && !authenticated && location.pathname !== "/") {
    navigate({ to: "/" });
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
              <Image boxSize={"35px"} src={config.logo} alt="solmail" />
              <chakra.span
                ml={2}
                fontSize={20}
                bg="solana"
                bgClip={"text"}
                fontWeight={"bold"}
              >
                Solmail
              </chakra.span>
            </Link>
          </Flex>
          <Flex gap={3} fontWeight={"medium"} alignItems={"center"}>
            Get the app{" "}
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
          </Flex>
        </Flex>
      )}
      <Flex flex={"auto"}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
