import { Button, Container, Flex } from "@chakra-ui/react";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { PiExport } from "react-icons/pi";
export const ExportPrivateKey: React.FC = () => {
  const { exportWallet, wallet } = usePrivyWallet();
  return (
    <Container
      alignItems={"center"}
      justifyContent={"center"}
      as={Flex}
      maxW="100%"
      direction={"column"}
    >
      <Flex maxW={300} textAlign={"center"} fontSize={13} mb={5}>
        Never share your private key or seed phrase with anyone.
      </Flex>
      <Flex>
        <Button
          rightIcon={<PiExport />}
          onClick={() => exportWallet({ address: wallet?.address ?? "" })}
        >
          Export Key
        </Button>
      </Flex>
    </Container>
  );
};
