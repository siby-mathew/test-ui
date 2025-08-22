import {
  Box,
  Button,
  chakra,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {
  QueryKeys,
  StorageVersion,
  type ComposerFormInputs,
  type SolanaPayPayload,
} from "src/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";

import { Subject } from "./Subject";
import { FieldWrapper } from "@components/Field";
import { encryptData, getSaltIV, trim } from "@utils/index";
import { web3 } from "@coral-xyz/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  usePrivyWallet,
  useSolanaConnection,
  useGenerateEncryptionKey,
  useToast,
  useGetMailProgramInstance,
  useMailBody,
  Attachment,
  useBalance,
} from "@hooks/index";

import { useSendTransaction } from "@privy-io/react-auth/solana";

import "react-quill/dist/quill.snow.css";
import QuillEditor from "./Quill";
import { IoSend } from "react-icons/io5";
import { Attachments } from "./Attachments";
import { useEffect, useState } from "react";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { EditorToolbar } from "./EditorToolbar";
import { useComposer } from "@hooks/useComposer";
import { AttachmentsList } from "./AttachmentsList";
import { RequestSolanaPay } from "@components/RequestSolanaPay";

import { useEmailResolver } from "@hooks/useEmailResolver";
import { usePinataUploader } from "@hooks/usePinataUploader";
import { v4 as uuidv4 } from "uuid";
import { useGetLinkedUsernameById } from "@hooks/useUsernames";
import { MailShareTypes } from "@state/index";
import { MAXIMUM_MAIL_SUBJECT_LENGTH, NO_BALANCE_LABEL } from "@const/config";
import { useQueryClient } from "@tanstack/react-query";
const initialValues = {
  to: "",
  subject: "",
  body: "",
  files: [],
};

export const ComposerLegacy: React.FC = () => {
  const connection = useSolanaConnection();
  const { wallet } = usePrivyWallet();
  const from = wallet?.address;
  const { mutateAsync } = useGenerateEncryptionKey();
  const { thread, action, ref, onClose: closeComposer } = useComposer();
  const [sharedAttachments, setSharedAttachments] = useState<Attachment[]>([]);
  const [isComposerReady, setComposerState] = useState<boolean>(!1);
  const queryClient = useQueryClient();
  const { context } = useComposer();

  const {
    subject,
    isLoading: isMailLoading,
    content,
    attachments,
    attachmentRef,
  } = useMailBody(ref, context);
  const {
    account: _account,
    displayName,
    isLoading,
  } = useGetLinkedUsernameById(thread);

  const methods = useForm<ComposerFormInputs>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      ...initialValues,
      to: "",
    },
  });

  useEffect(() => {
    if (isComposerReady) {
      return;
    }
    if (thread && !isLoading && !isMailLoading) {
      if (action === MailShareTypes.reply) {
        methods.setValue(
          "to",
          _account && _account.publicKey ? displayName : thread,
          {
            shouldValidate: !0,
          }
        );
        methods.setValue(
          "subject",
          trim(`Re : ${subject ?? ""}`, MAXIMUM_MAIL_SUBJECT_LENGTH)
        );
      }

      if (action === MailShareTypes.forward) {
        methods.setValue(
          "subject",
          trim(`Forward : ${subject ?? ""}`, MAXIMUM_MAIL_SUBJECT_LENGTH)
        );
        methods.setValue("body", content, {
          shouldValidate: !0,
        });

        if (attachments && attachments.length > 0) {
          setSharedAttachments(attachments);
        }
        set(new Date().getTime());
      }
      setComposerState(!0);
    }
  }, [
    _account,
    action,
    attachments,
    content,
    displayName,
    isComposerReady,
    isLoading,
    isMailLoading,
    methods,
    subject,
    thread,
  ]);

  const { mailAccountAddress, program, provider } = useGetMailProgramInstance();
  const { sendTransaction } = useSendTransaction();
  const { mutateAsync: uploadToPinata } = usePinataUploader();
  const { address } = usePrivyWallet();
  const { account } = useGetLinkedUsernameById(address);
  const { showToast } = useToast();

  const [id, set] = useState(0);
  const { hasEnoughBalance, refetch } = useBalance();

  const sleep = async (delay: number) => {
    return new Promise((r) => {
      setTimeout(() => {
        r(1);
      }, delay);
    });
  };

  const {
    collpaseComposer,
    updateStatus,
    onClose: close,
    expandComposer,
    composerCollapsed,
  } = useComposer();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const IS_FORWARDING = action === MailShareTypes.forward;

  const { mutateAsync: resolveRecepient } = useEmailResolver();
  const onSubmit: SubmitHandler<ComposerFormInputs> = async (values) => {
    updateStatus("Preparing your mail");
    collpaseComposer();
    const data = await resolveRecepient({ username: values.to });
    if (!data || !data.address || !from) {
      expandComposer();
      showToast("Failed to send", {
        type: "error",
      });
      return;
    }
    const to = data.address;

    const [user0, user1] =
      from?.toString() >= to?.toString() ? [from, to] : [to, from];
    const key = await mutateAsync(`${user0.toString()}:${user1?.toString()}`);

    const cData = getSaltIV();

    const encrypt = async (content: string) => {
      return encryptData(content, cData.iv, key);
    };

    if (values && values.files && values.files.length > 0) {
      updateStatus("Uploading files");
    } else {
      sleep(1500);
    }

    /**
     *
     */
    const uuid = uuidv4();
    const attachMentFormData = new FormData();
    type _Attachment = { name: string; size: number; type: string };
    const attachmentFiles: _Attachment[] = [];

    let attachmentHash: string = "";
    if (values.files && values.files.length) {
      values.files.forEach((file) => {
        attachMentFormData.append("file", file, `${uuid}/${file.name}`);
        attachmentFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
        });
      });

      const response = await uploadToPinata({
        data: attachMentFormData,
      });
      if (response && response.IpfsHash) {
        attachmentHash = response.IpfsHash;
      }
    }

    const body = `${values.body}`;
    const json: Record<string, any> = {
      body,
      origin: account?.publicKey?.toString() ?? "",
    };

    if (attachmentHash && attachmentFiles.length > 0) {
      json["attachments"] = attachmentFiles.map((name) => {
        return {
          hash: attachmentHash,
          name: name.name,
          meta: {
            ...name,
          },
        };
      });
    }

    if (IS_FORWARDING && attachmentRef && attachmentRef.length > 0) {
      json["attachments"] = [...attachmentRef, ...(json["attachments"] ?? [])];
    }
    if (values.solanaPay?.amount && values.solanaPay.tokenaddress) {
      json["solanaPay"] = [values.solanaPay];
    }
    const encryptedContent = await encrypt(`${JSON.stringify(json)}`);

    const textFile = new File([encryptedContent], `${uuid}/body.txt`, {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append("file", textFile);

    const contentId = await uploadToPinata({
      data: formData,
    });

    const id = contentId && contentId.IpfsHash;
    if (!id) {
      expandComposer();
      showToast("Failed to send email", {
        type: "error",
      });
      return;
    }

    try {
      if (!provider || !program) {
        return;
      }

      updateStatus("Sending mail");
      const mailAccount = web3.Keypair.generate();
      const userPublicKey = provider.publicKey;

      const createMailInstruction = await program.methods
        .createmail(
          encryptData(values.subject, cData.iv, key),
          userPublicKey,
          to,
          "salt!",
          cData.iv,
          StorageVersion.pinata,
          ref || "0"
        )
        .accounts({
          mail: mailAccount.publicKey,
          authority: userPublicKey,
          mailAccountV2: mailAccountAddress,
        })
        .instruction();

      const updateEmailInstruction = await program.methods
        .updatemail(id)
        .accounts({
          mail: mailAccount.publicKey,
          authority: userPublicKey,
        })
        .instruction();

      const transaction = new Transaction().add(
        createMailInstruction,
        updateEmailInstruction
      );

      const latestBlockhash = await connection.getLatestBlockhash("confirmed");
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = new PublicKey(
        wallet?.address?.toString() as string
      );
      transaction.partialSign(mailAccount);

      await sendTransaction({
        transaction: transaction,
        connection: connection,
        uiOptions: {
          showWalletUIs: !1,
        },
      });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
      showToast("Mail sent successfully", {
        type: "success",
      });
      close();
      refetch();
    } catch {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MAILBOX] });
      refetch();
      expandComposer();
      showToast("Failed to send mail", {
        type: "error",
      });
    }
  };

  const onValidateAddress = async (username: string) => {
    const res = await resolveRecepient({
      username,
    });
    if (res && res.status) {
      return !0;
    }

    return res && res.message ? res.message : "Please enter a valid address";
  };

  const handleChange = (value: string) => {
    methods.setValue("body", value);
  };

  const addSolanaPay = (payload: SolanaPayPayload) => {
    methods.setValue("solanaPay", payload);
    onClose();
  };

  methods.watch(["to"]);
  if (composerCollapsed) {
    return null;
  }

  const onRemoveSharedAttachment = (index: number) => {
    setSharedAttachments((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <FormProvider {...methods}>
      <Flex
        direction={"column"}
        px="5"
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        mx={"auto"}
        borderTopRadius={15}
        zIndex={500}
        w="100%"
        minH={"80vh"}
        h="100%"
      >
        <Flex direction={"column"}>
          <Flex
            borderBottom={"solid 1px"}
            borderBottomColor={"surface.700"}
            direction={"row"}
            justifyContent={"space-between"}
            py={3}
            mx="-20px"
            px="20px"
            bg="surface.500"
            borderTopRadius={10}
          >
            <Flex alignItems={"center"} fontSize={16}>
              <chakra.span fontWeight={"600jekej"}>
                Compose new message
              </chakra.span>
            </Flex>
            <Flex gap={3}>
              <Button
                onClick={closeComposer}
                size={"sm"}
                variant={"outlined"}
                colorScheme="red"
                _hover={{
                  opacity: 0.6,
                }}
              >
                Close
              </Button>
              <Button
                rightIcon={<IoSend />}
                size={"sm"}
                variant={"green"}
                type="submit"
                colorScheme="red"
                isDisabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? "Send" : NO_BALANCE_LABEL}
              </Button>
            </Flex>
          </Flex>
          <Flex w="100%" direction={"column"}>
            <Flex mt={3}>
              <FieldWrapper name="to" hasPadding={!1}>
                <Input
                  id="to"
                  variant={"secondary"}
                  placeholder="Wallet address or .sol domain"
                  {...methods.register("to", {
                    required: "To address is required",
                    validate: onValidateAddress,
                  })}
                />
              </FieldWrapper>
            </Flex>
            <Flex mt={3}>
              <FieldWrapper name="subject" hasPadding={!1}>
                <Subject />
              </FieldWrapper>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <EditorToolbar />
        </Flex>
        <Flex flex={"auto"} direction={"column"} position={"relative"}>
          <Flex position={"absolute"} inset={0}>
            <CustomScrollbarWrapper>
              <Box w="100%" px={1}>
                <QuillEditor key={id} onChange={handleChange} />
              </Box>
              <Box w="100%">
                <AttachmentsList
                  sharedAttachments={sharedAttachments}
                  onRemove={onRemoveSharedAttachment}
                />
              </Box>
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <Attachments onOpenSolanaPay={onOpen} />
        </Flex>
      </Flex>
      <RequestSolanaPay
        onSubmit={addSolanaPay}
        isOpen={isOpen}
        onClose={onClose}
      />
    </FormProvider>
  );
};
