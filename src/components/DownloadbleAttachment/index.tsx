import { Flex, Icon, Image, Spinner } from "@chakra-ui/react";
import { download, getFileConfig } from "@utils/file";
import { getStorageURLByVersion, shortenPrincipalId } from "@utils/string";
import { useTransition } from "react";

export const DownloadbleAttachment: React.FC<{
  name: string;
  path: string;
  version: string;
}> = ({ name, path, version }) => {
  const config = getFileConfig(name);
  const URL = getStorageURLByVersion(version, path);
  const [isPending, start] = useTransition();
  const onClick = () => {
    if (isPending) return;
    start(async () => {
      await download(URL, name);
    });
  };
  return (
    <Flex
      border="solid 1px"
      borderColor={"surface.400"}
      borderRadius={5}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Flex
        bg={config.color}
        boxSize={"50px"}
        borderLeftRadius={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {!isPending && (
          <>
            {!config.image && <Icon as={config.icon} />}
            {config.image && (
              <Image
                w="100%"
                h="100%"
                borderLeftRadius={"inherit"}
                objectFit={"cover"}
                src={URL}
                alt={name}
              />
            )}
          </>
        )}
        {isPending && <Spinner />}
      </Flex>
      <Flex px={2} alignItems={"center"}>
        {shortenPrincipalId(name)}
      </Flex>
    </Flex>
  );
};
