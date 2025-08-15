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
import { TransactionsList } from "@components/TransactionsList";

import { useTokensOwned } from "@hooks/useTokensOwned";

export const Holdings: React.FC = () => {
  const { tokens, isLoading } = useTokensOwned();

  return (
    <Box w="100%" borderRadius={5}>
      <Tabs variant={"wallet"}>
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
              {isLoading && (
                <Flex h={100} alignItems={"center"} justifyContent={"center"}>
                  <Spinner />
                </Flex>
              )}
              {tokens &&
                tokens.length > 0 &&
                tokens.map((token) => {
                  return (
                    <Flex
                      w="100%"
                      key={token.address}
                      transition={"all ease .2s"}
                      _hover={{
                        opacity: 0.6,
                        bg: "surface.300",
                      }}
                    >
                      <TokenCard {...token} />
                    </Flex>
                  );
                })}
            </VStack>
          </TabPanel>

          <TabPanel>
            <Flex
              opacity={0.5}
              minH={100}
              alignItems={"center"}
              justifyContent={"center"}
              userSelect={"none"}
            >
              <TransactionsList />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
