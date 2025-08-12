import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useLinkUsername, useUnlinkUsername } from "@hooks/useUsername";
import { useGetMyUsernamesByOwner } from "@hooks/useUsernames";
import { PublicKey } from "@solana/web3.js";
import { isFunction } from "lodash";

type LinkableMail = {
  username: string;
  domain: string;
  mailbox: PublicKey | null;
  account: PublicKey;
  onUpdate: () => void;
};
const LinkableMail: React.FC<LinkableMail> = ({
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
  const onUnlinkHandler = async () => {
    await mutateAsync({
      usernameAccount: account,
    });
    if (isFunction(onUpdate)) {
      onUpdate();
    }
  };

  const onLinkHandler = async () => {
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
      <Flex>
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
      </Flex>
    </Flex>
  );
};

export const LinkUserName: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { address } = usePrivyWallet();
  const { usernames } = useGetMyUsernamesByOwner(address);

  const onUpdate = () => {
    onClose();
  };
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader>
          Link username
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <VStack w="100%">
            {usernames &&
              usernames.map(({ account, publicKey }) => {
                return (
                  <LinkableMail
                    username={account.username}
                    domain={account.domain}
                    mailbox={account.mailbox}
                    account={publicKey}
                    onUpdate={onUpdate}
                  />
                );
              })}

            {(!usernames || !usernames.length) && (
              <Flex>No usernames avalable</Flex>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
