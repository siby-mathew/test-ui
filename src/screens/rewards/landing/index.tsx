import { Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import { AnalyticCard } from "@components/AnalyticCard";

import SolanaLogo from "@assets/solana.png";
import { BsPeopleFill } from "react-icons/bs";
import { AnalyticsHeader } from "@components/AnalyticsHeader";
import { RewardsProfile } from "@components/RewardsProfile";
import { AnalyticsList } from "@components/AnalyticsList";
import { useProfile } from "@hooks/useProfile";
import { CustomScrollbarWrapper } from "@components/ScrollWrapper";
import { config } from "@const/config";
import { RewardsChart } from "@components/RewardsChart";
import { Quests } from "@components/QuestSlider";

export const ReferralDashboard = () => {
  const { data } = useProfile();
  return (
    <Flex as={Container} maxW={"100%"} py={5} w="100%">
      <CustomScrollbarWrapper>
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(3, auto)"
          gap={2}
        >
          <GridItem
            rowSpan={{
              base: 1,
              md: 3,
            }}
            colSpan={{
              md: 1,
              base: 4,
            }}
          >
            <RewardsProfile />
          </GridItem>
          <GridItem
            colSpan={{
              md: 3,
              base: 4,
            }}
          >
            <AnalyticsHeader />
          </GridItem>
          <GridItem colSpan={{ md: 1, base: 4 }}>
            <AnalyticCard icon={config.logo} label="Mail claimed" value="0" />
          </GridItem>
          <GridItem colSpan={{ md: 1, base: 4 }}>
            <AnalyticCard
              icon={BsPeopleFill}
              label="Friends Referred"
              value={data?.referrals.count ?? ""}
            />
          </GridItem>
          <GridItem
            alignItems={"center"}
            justifyContent={"center"}
            colSpan={{
              base: 4,
              md: 1,
            }}
            rowSpan={{
              md: 2,
              base: 1,
            }}
            borderRadius={15}
            bg="surface.600"
          >
            <RewardsChart />
          </GridItem>

          <GridItem
            colSpan={{
              md: 2,
              base: 4,
            }}
          >
            <Flex
              direction={"row"}
              w="100%"
              bg="surface.600"
              borderRadius={15}
              h="100%"
              alignItems={"center"}
            >
              <AnalyticCard
                icon={config.logo}
                label="Claimable $MAIL"
                value="0"
              />
              <AnalyticCard
                icon={SolanaLogo}
                label="Claimable $SOL"
                value="0"
              />
              <Flex px={5}>
                <Button
                  isDisabled
                  size={"sm"}
                  variant="green"
                  borderRadius={20}
                  bg="green.500 !important"
                >
                  Claim all
                </Button>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem
            colSpan={{
              md: 3,
              base: 4,
            }}
          >
            <AnalyticsList />
          </GridItem>
          <GridItem
            colSpan={{
              md: 1,
              base: 4,
            }}
          >
            <Flex h="100%" bg="surface.600" borderRadius={15}>
              <Quests />
            </Flex>
          </GridItem>
        </Grid>
      </CustomScrollbarWrapper>
    </Flex>
  );
};
