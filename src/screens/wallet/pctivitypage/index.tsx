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
import { WalletContainerSmall } from "@components/WalletContainerSmall";

import { useTokensOwned } from "@hooks/useTokensOwned";
import { Link, useParams } from "@tanstack/react-router";

export const ActivityPage: React.FC = () => {
  const { tokens, isLoading } = useTokensOwned();
  const { id } = useParams({
    from: "/u/_layout/wallet/_layout/activity/$id",
  });
  const index = ["assets", "transactions"].indexOf(id) || 0;

  return (
    <Box w="100%" borderRadius={5}>
      <WalletContainerSmall>
        <Tabs variant={"wallet"} index={index}>
          <TabList>
            <Tab py={4} flex={"auto"} as={Link} to="/u/wallet/activity/assets">
              Tokens
            </Tab>
            <Tab
              py={4}
              flex={"auto"}
              as={Link}
              to="/u/wallet/activity/transactions"
            >
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
      </WalletContainerSmall>
    </Box>
  );
};
