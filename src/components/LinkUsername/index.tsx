import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import {
  useLinkUsername,
  useUnlinkUsername,
  useUsernameUpdateStatus,
} from "@hooks/useUsername";
import { useGetMyUsernames } from "@hooks/useUsernames";
import { PublicKey } from "@solana/web3.js";

import { isFunction } from "lodash";
import { useState } from "react";

type LinkableMail = {
  username: string;
  domain: string;
  mailbox: PublicKey | null;
  account: PublicKey;
  onUpdate: () => void;
  updatePending: boolean;
  updateStatus: (s: boolean) => void;
};
export const LinkableMail: React.FC<LinkableMail> = ({
  username,
  domain,
  mailbox,
  account,
  onUpdate,
}) => {
  const { address } = usePrivyWallet();
  const isLinked = address && address === mailbox?.toString();
  const { mutateAsync, isPending } = useUnlinkUsername();
  const { mutateAsync: linkUsername, isPending: isLinking } = useLinkUsername();
  const { updatingUsername } = useUsernameUpdateStatus();
  const onUnlinkHandler = async () => {
    if (updatingUsername) {
      return;
    }
    await mutateAsync({
      usernameAccount: account,
    });
    if (isFunction(onUpdate)) {
      onUpdate();
    }
  };

  const onLinkHandler = async () => {
    if (updatingUsername) {
      return;
    }
    await linkUsername({
      usernameAccount: account,
    });
  };
  return (
    <Flex w="100%" direction={"row"}>
      <Flex direction={"column"} flex={"auto"}>
        <Flex w="100%">
          {username}@{domain}
        </Flex>
        {isLinked && (
          <Flex my={"2px"}>
            <Badge
              textTransform={"none"}
              fontWeight={"normal"}
              fontSize={12}
              colorScheme="green"
            >
              Linked
            </Badge>
          </Flex>
        )}
      </Flex>
      <Flex data-key={updatingUsername ? "updating" : "not-updating"}>
        <Tooltip
          isDisabled={!updatingUsername}
          hasArrow
          label="Update is in progress"
        >
          {isLinked && (
            <Button variant={"red"} size={"sm"} onClick={onUnlinkHandler}>
              Unlink {isPending && <Spinner ml={1} size={"sm"} />}
            </Button>
          )}

          {!isLinked && (
            <Button onClick={onLinkHandler} size={"sm"}>
              Link {isLinking && <Spinner ml={1} size={"sm"} />}
            </Button>
          )}
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export const LinkUserName: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          Link username
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <Flex w="100%" mb={5}>
            <UsernameLinkBox />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const UsernameLinkBox: React.FC<{ onUpdate?: () => void }> = ({
  onUpdate,
}) => {
  const { address } = usePrivyWallet();
  const { usernames } = useGetMyUsernames(address);
  const [isUpdating, setIsUpdating] = useState<boolean>(!1);
  const onUpdateHandler = () => {
    if (isFunction(onUpdate)) {
      onUpdate();
    }
  };
  return (
    <VStack w="100%">
      {usernames &&
        usernames.map(({ account, publicKey }) => {
          return (
            <LinkableMail
              username={account.username}
              domain={account.domain}
              mailbox={account.mailbox}
              account={publicKey}
              onUpdate={onUpdateHandler}
              updateStatus={setIsUpdating}
              updatePending={isUpdating}
            />
          );
        })}

      {(!usernames || !usernames.length) && <Flex>No usernames avalable</Flex>}
    </VStack>
  );
};
