import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import type { ComposerFormInputs } from "src/types";
import { useId, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { RiAttachment2 } from "react-icons/ri";

import { formatFileSize } from "@utils/index";
import { useToast } from "@hooks/useToast";

import React from "react";
import { SolanaPayButton } from "@components/SolanaPayButton";

export const Attachments: React.FC<{
  onOpenSolanaPay: () => void;
}> = ({ onOpenSolanaPay }) => {
  const id = useId();
  const { getValues, watch, setValue } = useFormContext<ComposerFormInputs>();
  const watchedFiles = getValues().files;
  const files = useMemo(() => watchedFiles || [], [watchedFiles]);
  const { showToast } = useToast();
  watch(["files"]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles = Array.from(selected);
    const existingFileNames = files.map((file) => file.name);
    const filteredNewFiles = newFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    const updatedFiles = [...files, ...filteredNewFiles];
    const updatedTotalSize = updatedFiles.reduce(
      (sum, file) => sum + file.size,
      0
    );

    if (filteredNewFiles.length < newFiles.length) {
      showToast("Some files were already attached and were skipped.", {
        type: "error",
      });
    }

    if (updatedTotalSize > 10 * 1024 * 1024) {
      showToast("Total file size exceeds the 10 MB limit.", {
        type: "error",
      });
      return;
    }

    setValue("files", updatedFiles);
  };

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  return (
    <Flex direction="column" w="full">
      <Flex gap={2} pb={3} alignItems={"center"}>
        <Input id={id} type="file" multiple hidden onChange={onChangeHandler} />

        <SolanaPayButton onOpenSolanaPay={onOpenSolanaPay} />

        <IconButton
          as="label"
          htmlFor={id}
          aria-label="Attach file"
          icon={<RiAttachment2 />}
          variant="ghost"
          cursor="pointer"
          bg="surface.200"
        />
        {!!files.length && (
          <Flex
            direction="column"
            justify="center"
            bg="surface.100"
            transition={"all ease .2s"}
            _hover={{
              bg: "surface.200",
            }}
            p={1}
            px={5}
            borderRadius={8}
            cursor={"pointer"}
            fontSize="12"
            position={"relative"}
          >
            <Text>{files.length} file selected</Text>
            <Text opacity={0.6}>{formatFileSize(totalSize)} / 10MB</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
