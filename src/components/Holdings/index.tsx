import {
  Box,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { TokenCard } from "@components/TokenCard";
import { useBalance } from "@hooks/useBalance";

import { useTokensOwned } from "@hooks/useTokensOwned";

export const Holdings: React.FC = () => {
  const { data, isLoading } = useTokensOwned();
  const { data: solBalance } = useBalance();
  return (
    <Box w="100%" bg="surface.500" borderRadius={15}>
      <Tabs>
        <TabList>
          <Tab py={4} flex={"auto"}>
            Tokens
          </Tab>
          <Tab py={4} flex={"auto"}>
            Activity
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack gap={0} w="100%">
              <TokenCard
                address=""
                mint={import.meta.env.VITE_SOLMAIL_SOLANA_ADDRESS}
                amount={solBalance ?? 0}
                delegated_amount={0}
                frozen
                owner=""
              />
              {isLoading && (
                <Flex h={100} alignItems={"center"} justifyContent={"center"}>
                  <Spinner />
                </Flex>
              )}
              {data &&
                data.token_accounts &&
                data.token_accounts.map((token) => {
                  return <TokenCard key={token.address} {...token} />;
                })}

              {!data ||
                !data.token_accounts ||
                (!data.token_accounts.length && (
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    minH={100}
                    opacity={0.5}
                  >
                    No tokens found
                  </Flex>
                ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
