import {
  Box,
  Button,
  chakra,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {
  StorageVersion,
  type ComposerFormInputs,
  type SolanaPayPayload,
} from "src/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";

import { Subject } from "./Subject";
import { FieldWrapper } from "@components/Field";
import {
  encryptData,
  getSaltIV,
  isValidAddress,
  resolveEmail,
} from "@utils/index";
import { web3 } from "@project-serum/anchor";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  useIrysUploader,
  usePrivyWallet,
  useSolanaConnection,
  useGenerateEncryptionKey,
  useToast,
  useGetMailProgramInstance,
} from "@hooks/index";

import { useSendTransaction } from "@privy-io/react-auth/solana";

import "react-quill/dist/quill.snow.css";
import QuillEditor from "./Quill";
import { IoSend } from "react-icons/io5";
import { Attachments } from "./Attachments";
import { useState } from "react";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { EditorToolbar } from "./EditorToolbar";
import { useComposer } from "@hooks/useComposer";
import { AttachmentsList } from "./AttachmentsList";
import { RequestSolanaPay } from "@components/RequestSolanaPay";
import { generateHtmlTag } from "@utils/string/generateHtml";
const initialValues = {
  to: "",
  subject: "",
  body: "",
  files: [],
};

const solEmailRegex = /^[^\s@]+@[^\s@]+\.sol$/;
export const ComposerLegacy: React.FC = () => {
  const connection = useSolanaConnection();
  const { wallet } = usePrivyWallet();
  const from = wallet?.address;
  const { mutateAsync } = useGenerateEncryptionKey();
  const { thread, ref } = useComposer();
  const methods = useForm<ComposerFormInputs>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      ...initialValues,
      to: thread,
    },
  });

  const { uploadContentWithAttchment } = useIrysUploader();
  const { mailAccountAddress, program, provider } = useGetMailProgramInstance();
  const { sendTransaction } = useSendTransaction();
  const { showToast } = useToast();
  const [id, set] = useState(0);

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

  const { onOpen, onClose, isOpen } = useDisclosure();

  const validateToAddress = (value: string) => {
    if (value === wallet?.address?.toString()) {
      return "To address cannot be same as your wallet address";
    }

    const isValidSolAddress = isValidAddress(value);
    const isValidSolEmail = solEmailRegex.test(value);

    if (!isValidSolAddress && !isValidSolEmail) {
      return "Enter a valid wallet address or .sol email";
    }

    return true;
  };

  const onSubmit: SubmitHandler<ComposerFormInputs> = async (values) => {
    updateStatus("Preparing your mail");
    collpaseComposer();
    const to = await resolveEmail(values.to, connection);
    if (!to || !from) {
      expandComposer();
      showToast("Failed to send", {
        type: "error",
      });
      return;
    }

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
    const payments = values.solanaPay
      ? generateHtmlTag("button", values.solanaPay)
      : "";
    const id = await uploadContentWithAttchment(
      {
        content: `${values.body}${payments}`,
        files: values.files,
      },
      encrypt
    );

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
          StorageVersion.arweave,
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
      });

      close();
    } catch {
      expandComposer();
      showToast("Failed to send mail", {
        type: "error",
      });
    }
  };

  const reset = () => {
    methods.reset(initialValues);
    set(new Date().getTime());
  };

  const handleChange = (value: string) => {
    methods.setValue("body", value);
  };

  const addSolanaPay = (payload: SolanaPayPayload) => {
    methods.setValue("solanaPay", payload);
    onClose();
  };

  if (composerCollapsed) {
    return null;
  }
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
          <Flex direction={"row"} justifyContent={"space-between"} py={3}>
            <Flex alignItems={"center"} fontSize={18}>
              <chakra.span fontWeight={"bold"}>Compose new message</chakra.span>
            </Flex>
            <Flex gap={3}>
              <Button
                onClick={reset}
                size={"sm"}
                variant={"outlined"}
                colorScheme="red"
              >
                Discard
              </Button>
              <Button
                rightIcon={<IoSend />}
                size={"sm"}
                variant={"green"}
                type="submit"
                colorScheme="red"
              >
                Send
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
                    validate: validateToAddress,
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
              <Box w="100%">
                <QuillEditor key={id} onChange={handleChange} />
              </Box>
              <Box w="100%">
                <AttachmentsList />
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
