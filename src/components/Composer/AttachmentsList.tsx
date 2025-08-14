import { Flex, Icon } from "@chakra-ui/react";
import { Attachment } from "@hooks/useMailBody";
import { getFileConfig } from "@utils/file";
import { shortenPrincipalId } from "@utils/string";
import { useMemo } from "react";

import { useFormContext } from "react-hook-form";
import { MdClear } from "react-icons/md";
import type { ComposerFormInputs } from "src/types";

const FilePreview: React.FC<{ file: File; onClear: () => void }> = ({
  file,
  onClear,
}) => {
  const config = getFileConfig(file.name);
  return (
    <Flex
      display={"inline-flex"}
      p="1"
      bg={config.color}
      color={"#fff"}
      borderRadius={5}
      alignItems={"center"}
      pr="40px"
      position={"relative"}
    >
      <Icon as={config.icon} mr={2} />
      {shortenPrincipalId(file.name)}
      <Flex
        alignItems={"center"}
        position={"absolute"}
        justifyContent={"center"}
        top={0}
        right={0}
        bottom={0}
        w="40px"
        cursor={"pointer"}
        transition={"all ease .2s"}
        onClick={onClear}
        _hover={{
          opacity: 0.5,
        }}
      >
        <Icon as={MdClear} />
      </Flex>
    </Flex>
  );
};
export const AttachmentsList: React.FC<{
  sharedAttachments: Attachment[];
  onRemove: (i: number) => void;
}> = ({ sharedAttachments, onRemove }) => {
  const { getValues, watch, setValue } = useFormContext<ComposerFormInputs>();
  const watchedFiles = getValues().files;
  const files = useMemo(() => watchedFiles || [], [watchedFiles]);
  const onRemoveHandler = (index: number) => {
    setValue(
      "files",
      files.filter((_, i) => i !== index)
    );
  };
  watch(["files"]);
  return (
    <Flex w="100%" flexWrap={"wrap"} gap={3}>
      {sharedAttachments &&
        sharedAttachments.length > 0 &&
        sharedAttachments.map((attachment, index) => {
          return (
            <FilePreview
              key={index}
              file={attachment as unknown as File}
              onClear={() => onRemove(index)}
            />
          );
        })}
      {files.map((file, index) => {
        return (
          <FilePreview
            key={file.name + index}
            file={file}
            onClear={() => onRemoveHandler(index)}
          />
        );
      })}
    </Flex>
  );
};
