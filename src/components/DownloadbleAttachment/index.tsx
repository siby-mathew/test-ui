import { Flex, Icon, Image, Spinner } from "@chakra-ui/react";
import { download, getFileConfig } from "@utils/file";
import { shortenPrincipalId } from "@utils/string";
import { useTransition } from "react";

export const DownloadbleAttachment: React.FC<{
  name: string;
  path: string;
}> = ({ name, path }) => {
  const config = getFileConfig(name);

  const [isPending, start] = useTransition();
  const onClick = () => {
    if (isPending) return;
    start(async () => {
      await download(path, name);
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
                src={path}
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
