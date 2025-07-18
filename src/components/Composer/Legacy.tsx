import { Box, Button, chakra, Flex, Input } from "@chakra-ui/react";
import type { ComposerFormInputs } from "src/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";

import { Subject } from "./Subject";
import { FieldWrapper } from "@components/Field";
import { encryptData, getSaltIV, resolveEmail } from "@utils/index";
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

export const MAIL_UPLOAD_FEATURE_FLAG = "0.0.4";

import "react-quill/dist/quill.snow.css";
import QuillEditor from "./Quill";
import { IoSend } from "react-icons/io5";
import { Attachments } from "./Attachments";
import { useState } from "react";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { EditorToolbar } from "./EditorToolbar";
import { useComposer } from "@hooks/useComposer";
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
  const methods = useForm<ComposerFormInputs>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: initialValues,
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
  } = useComposer();

  const onSubmit: SubmitHandler<ComposerFormInputs> = async (values) => {
    updateStatus("Prepairing your mail");
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

    const id = await uploadContentWithAttchment(
      {
        content: values.body,
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
          MAIL_UPLOAD_FEATURE_FLAG,
          "0"
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

      showToast("Mail sent successfully", {
        type: "success",
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

  return (
    <FormProvider {...methods}>
      {/* <MailSteps
        steps={steps}
        activeStep={activeStep}
        isOpen={isOpen}
        onClose={() => {}}
        key={activeStep}
      /> */}

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
            </CustomScrollbarWrapper>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <Attachments />
        </Flex>
      </Flex>
    </FormProvider>
  );
};
