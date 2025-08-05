import { Flex } from "@chakra-ui/react";
import { SolBalance } from "@components/SolBalance";
import { UserProfileCard } from "@components/UserProfile";
import { useQuickNode } from "@hooks/useQuickNode";
import { useEffect } from "react";

export const Navbar: React.FC = () => {
  const { mutateAsync } = useQuickNode();
  useEffect(() => {
    mutateAsync({
      method: "sns_reverseLookup",
      params: ["Crf8hzfthWGbGbLTVCiqRqV5MVnbpHB1L9KQMd6gsinb"],
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [mutateAsync]);
  return (
    <Flex
      w="100%"
      direction={"row"}
      px={5}
      py={3}
      gap={2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex></Flex>
      <Flex gap={3}>
        <SolBalance />
        <UserProfileCard />
      </Flex>
    </Flex>
  );
};
