import { Flex } from "@chakra-ui/react";
import { Composer } from "@components/Composer";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import { useSigner } from "@hooks/useSigner";
import { Outlet } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useMailAccount } from "@hooks/useMailAccount";
import { RequestAccountCreation } from "@components/RequestAccountCreation";
import { noop } from "lodash";
import { useEmbeddedWallet } from "@hooks/useEmbeddedWallet";

import { useProfile } from "@hooks/useProfile";
import { ReferalCodeClaim } from "@components/ReferalCodeClaim";
import { usePrivy } from "@privy-io/react-auth";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";

export const UserLayout: React.FC = () => {
  const { isAuthenticating, isAuthenticated, requestSignIn } = useSigner();
  const { isModalOpen, authenticated } = usePrivy();
  const { requestProfileCreation, refetch: refetchProfile } = useProfile();
  const { provider } = useGetMailProgramInstance();
  useEmbeddedWallet();
  const { hasAccount, isLoading, refetch, isRefetching, isFetched } =
    useMailAccount();

  useEffect(() => {
    if (
      authenticated &&
      provider &&
      provider.publicKey &&
      !isAuthenticated &&
      !isAuthenticating
    ) {
      requestSignIn();
    }
  }, [
    authenticated,
    isAuthenticated,
    isAuthenticating,
    provider,
    requestSignIn,
  ]);
  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const onCloseHandler = () => {
    refetchProfile();
  };

  const requestWalletCreation = isFetched && !hasAccount && !isLoading;

  return (
    <Flex w="100%" direction={"row"}>
      <ReferalCodeClaim
        isOpen={
          isAuthenticated &&
          !requestWalletCreation &&
          !isModalOpen &&
          requestProfileCreation
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

              {(true || (isAuthenticated && requestWalletCreation)) && (
                <RequestAccountCreation
                  isOpen={true}
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
