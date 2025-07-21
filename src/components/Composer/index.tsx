import { Flex } from "@chakra-ui/react";
import { ComposerLegacy } from "@components/Composer/Legacy";
import { FancyBox } from "@components/FancyBox";
import { useComposer } from "@hooks/useComposer";

export const Composer: React.FC = () => {
  const { onClose } = useComposer();
  const { isOpen, composerCollapsed } = useComposer();
  return (
    <>
      {isOpen && (
        <>
          {!composerCollapsed && (
            <>
              <Flex
                position={"absolute"}
                bg="rgba(0,0,0,.6)"
                backdropFilter={"blur(2px)"}
                inset={0}
                zIndex={100}
                onClick={onClose}
              ></Flex>
            </>
          )}

          <Flex
            position={"fixed"}
            zIndex={500}
            right={100}
            bottom={0}
            borderTopRadius={8}
            maxW={550}
            bg="#181818"
            w="full"
            alignItems={"flex-end"}
          >
            <ComposerLegacy />
            {composerCollapsed && <FancyBox />}
          </Flex>
        </>
      )}
    </>
  );
};
