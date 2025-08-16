import { Flex } from "@chakra-ui/react";
import { Composer } from "@components/Composer";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import { useSigner } from "@hooks/useSigner";
import { Outlet } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useMailAccount } from "@hooks/useMailAccount";
import { RequestAccountCreation } from "@components/RequestAccountCreation";
import { noop } from "lodash";
import { useEmbeddedWallet } from "@hooks/useEmbeddedWallet";

import { useProfile } from "@hooks/useProfile";
import { ReferalCodeClaim } from "@components/ReferalCodeClaim";
import { usePrivy } from "@privy-io/react-auth";
import { useGetMailProgramInstance } from "@hooks/useMailProgramInstance";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { ClaimUserName } from "@components/ClaimUsername";
import { LinkUserName } from "@components/LinkUsername";
import { useUsernamePopup } from "@hooks/useUsernamePopup";

export const UserLayout: React.FC = () => {
  const { isOpen, onClose, onOpen } = useUsernamePopup();
  const { isAuthenticating, isAuthenticated, requestSignIn } = useSigner();
  const { isModalOpen, authenticated } = usePrivy();
  const { requestProfileCreation, refetch: refetchProfile } = useProfile();
  const { provider } = useGetMailProgramInstance();
  useEmbeddedWallet();
  const { hasAccount, isLoading, refetch, isRefetching, isFetched } =
    useMailAccount();

  const { address } = usePrivyWallet();
  const { hasUserNames, account } = useGetLinkedUsernameById(address);

  const [isUserReady, setIsUserReady] = useState<boolean>(!1);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authenticated && !requestProfileCreation && !requestWalletCreation) {
      timer = setTimeout(() => {
        setIsUserReady(!0);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [authenticated, requestProfileCreation, requestWalletCreation]);

  const CAN_REQUEST_USERNAME =
    isUserReady &&
    isAuthenticated &&
    !requestProfileCreation &&
    !requestWalletCreation;
  console.log(isOpen);
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

      {/* {CAN_REQUEST_USERNAME && !hasUserNames && !walletPrompt && ( */}
      <ClaimUserName isOpen={isOpen} onClose={onClose} />
      {/* )} */}

      {/* {CAN_REQUEST_USERNAME && hasUserNames && !walletPrompt && !account && ( */}
      <LinkUserName isOpen={isOpen} onClose={onClose} />
      {/* )} */}

      <Flex as={"aside"}>
        <Sidebar />
      </Flex>
      <Flex
        bg="surface.300"
        flex={"auto"}
        borderLeftRadius={20}
        direction={"column"}
      >
        <Flex
          as={"nav"}
          borderBottom={"solid 1px"}
          borderBottomColor={"surface.700"}
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

              {isAuthenticated && requestWalletCreation && (
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
