import {
  Button,
  chakra,
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
} from "@chakra-ui/react";
import { SolmailSuffixInput } from "@components/SolmailSuffixInput";
import { useClaimUserName } from "@hooks/useUsername";

import { useId, useTransition } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormClaimUsername } from "src/types";

export const ClaimUserName: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const methods = useForm<FormClaimUsername>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      username: "",
    },
  });
  const { mutateAsync, isPending } = useClaimUserName();
  const [isPendingStatus, startTransition] = useTransition();
  const onSubmitHandler: SubmitHandler<FormClaimUsername> = ({ username }) => {
    if (isPending) {
      return;
    }
    startTransition(async () => {
      try {
        const res = await mutateAsync({ username });
        if (res) {
          onClose();
        }
      } catch {
        //
      }
    });
  };

  const id = useId();

  return (
    <Modal isCentered size={"xl"} {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        <ModalHeader textAlign={"center"}>
          <Flex direction={"column"}>
            <Flex w="100%" direction={"column"}>
              <Flex>Create your unique</Flex>
              <Flex>
                <chakra.span color={"solana.middle"} mr={1}>
                  sol.mail
                </chakra.span>
                username
              </Flex>
            </Flex>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <FormProvider {...methods}>
            <Flex
              id={id}
              as="form"
              direction={"column"}
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              <Flex>
                <Flex opacity={0.5} fontSize={13}>
                  You choose a name that represents you. It will be visible to
                  anyone messaging you.
                </Flex>
              </Flex>
              <Flex my={2}>
                <SolmailSuffixInput />
              </Flex>
              <Flex data-suggestions>
                <Flex
                  minH={"30vh"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                  p={10}
                  opacity={0.5}
                >
                  Usernames are stored on-chain. You’ll need a small amount of
                  $MAIL to complete this. Dont worry, we’ve already airdropped
                  you this!
                </Flex>
              </Flex>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="green" type="submit" form={id}>
            {isPending || isPendingStatus ? (
              <Spinner size={"sm"} />
            ) : (
              "Make it yours"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
