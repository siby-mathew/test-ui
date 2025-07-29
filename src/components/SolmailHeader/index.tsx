import { Button, Flex } from "@chakra-ui/react";
import { useComposer } from "@hooks/useComposer";
import { FaPen } from "react-icons/fa6";

export const SolmailHeader: React.FC = () => {
  const { onOpen } = useComposer();
  return (
    <Flex w="100%">
      <Button onClick={() => onOpen()} rightIcon={<FaPen />} w="full">
        Compose
      </Button>
    </Flex>
  );
};
