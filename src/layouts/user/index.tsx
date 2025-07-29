import { Flex, useDisclosure } from "@chakra-ui/react";
import { Composer } from "@components/Composer";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import { useSigner } from "@hooks/useSigner";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMailAccount } from "@hooks/useMailAccount";
import { RequestAccountCreation } from "@components/RequestAccountCreation";
import { noop } from "lodash";
import { useEmbeddedWallet } from "@hooks/useEmbeddedWallet";
import { ClaimUserName } from "@components/ClaimUsername";
import { useProfile } from "@hooks/useProfile";
import { ReferalCodeClaim } from "@components/ReferalCodeClaim";
import { usePrivy } from "@privy-io/react-auth";

export const UserLayout: React.FC = () => {
  const { isAuthenticating, isAuthenticated, requestSignIn } = useSigner();
  const { isModalOpen } = usePrivy();
  const { requestProfileCreation, refetch: refetchProfile } = useProfile();
  useEmbeddedWallet();
  const { hasAccount, isLoading, refetch, isRefetching, isFetched } =
    useMailAccount();
  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      requestSignIn();
    }
  }, [isAuthenticated, isAuthenticating, requestSignIn]);
  const onSuccess = () => {
    refetch();
  };

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: !1 });
  const onCloseHandler = () => {
    refetchProfile();
  };

  const requestWalletCreation = isFetched && !hasAccount && !isLoading;
  return (
    <Flex w="100%" direction={"row"}>
      <ClaimUserName isOpen={isOpen} onClose={onClose} />
      <ReferalCodeClaim
        isOpen={
          !requestWalletCreation && !isModalOpen && requestProfileCreation
        }
        onClose={onCloseHandler}
      />
      <Flex as={"aside"}>
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
              {hasAccount && (
                <>
                  <Composer />
                  <Outlet />
                </>
              )}

              {requestWalletCreation && (
                <RequestAccountCreation
                  isOpen={!0}
                  onClose={noop}
                  onSuccess={onSuccess}
                  isRefetching={isRefetching}
                />
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
