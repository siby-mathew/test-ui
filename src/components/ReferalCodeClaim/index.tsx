import {
  Button,
  chakra,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
} from "@chakra-ui/react";
import { FieldWrapper } from "@components/Field";
import { useCreateProfile } from "@hooks/useCreateProfile";
import { useExistingQueries } from "@hooks/useExistingQueries";
import { validateCode } from "@utils/string/code";

import { useId } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Form = {
  code: string;
};
export const ReferalCodeClaim: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { params } = useExistingQueries();
  const { isPending, mutateAsync } = useCreateProfile();

  const id = useId();
  const methods = useForm<Form>({
    mode: "all",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
    defaultValues: {
      code: params?.r,
    },
  });

  const { getValues } = methods;
  const code = getValues().code ?? "";

  const createProfile = async (code: string = "") => {
    try {
      await mutateAsync({
        code,
      });
      onClose();
    } catch {
      onClose();
    }
  };

  const onSubmitHandler: SubmitHandler<Form> = async ({ code }) => {
    createProfile(code);
  };

  const onSkip = () => {
    createProfile();
  };
  return (
    <Modal isCentered {...props} onClose={onSkip}>
      <ModalOverlay />
      <ModalContent position={"relative"}>
        {isPending && (
          <Flex
            zIndex={1}
            position={"absolute"}
            inset={0}
            bg={"rgba(0,0,0,.4)"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Spinner />
          </Flex>
        )}
        <ModalHeader textAlign={"center"}></ModalHeader>
        <ModalBody pt={0}>
          <FormProvider {...methods}>
            <Flex
              id={id}
              as="form"
              direction={"column"}
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex mb={2}>
                  <chakra.span
                    fontWeight={"bold"}
                    fontSize={20}
                    color={"light.100"}
                  >
                    Enter Referral Code
                  </chakra.span>
                </Flex>
                <Flex textAlign={"center"}>
                  <chakra.span opacity={0.5}>
                    If you’ve been referred by a friend, enter their code below
                    to earn bonus points.
                  </chakra.span>
                </Flex>
              </Flex>
              <Flex mb={2}>
                <FieldWrapper id="code" name="code">
                  <Input
                    textAlign={"center"}
                    placeholder="Enter referral code"
                    fontWeight={"bold"}
                    id="code"
                    {...methods.register("code", {
                      validate: validateCode,
                      required: {
                        value: !!code.trim(),
                        message: "Please enter a valid referral code",
                      },
                    })}
                  />
                </FieldWrapper>
              </Flex>
            </Flex>
          </FormProvider>
        </ModalBody>
        <ModalFooter gap={3} alignItems={"center"} justifyContent={"center"}>
          <Button type="button" onClick={onSkip}>
            Skip
          </Button>

          <Button variant="green" type="submit" form={id}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
