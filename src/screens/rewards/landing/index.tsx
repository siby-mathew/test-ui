import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { AnalyticCard } from "@components/AnalyticCard";

import SolanaLogo from "@assets/solana.png";
import { BsPeopleFill } from "react-icons/bs";
import { AnalyticsHeader } from "@components/AnalyticsHeader";
import { RewardsProfile } from "@components/RewardsProfile";
import { AnalyticsList } from "@components/AnalyticsList";

export const ReferralDashboard = () => {
  return (
    <Box bg="#030914" color="white" minH="100vh" p={4} w="100%">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(3, auto)"
        gap={2}
      >
        <GridItem rowSpan={3} colSpan={1}>
          <RewardsProfile />
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <AnalyticsHeader />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <AnalyticCard icon={SolanaLogo} label="Mail claimed" value="32,900" />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <AnalyticCard
            icon={BsPeopleFill}
            label="Friends Referred"
            value="13"
          />
        </GridItem>
        <GridItem
          alignItems={"center"}
          justifyContent={"center"}
          colSpan={1}
          rowSpan={2}
          borderRadius={15}
          bg="dark.60"
        ></GridItem>

        <GridItem colSpan={2}>
          <Flex
            direction={"row"}
            w="100%"
            bg="dark.60"
            borderRadius={15}
            h="100%"
          >
            <AnalyticCard
              icon={SolanaLogo}
              label="Claimable $MAIL"
              value="6,541"
            />
            <AnalyticCard
              icon={SolanaLogo}
              label="Claimable $SOL"
              value="1.05"
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>
          <AnalyticsList />
        </GridItem>
        <GridItem>
          <Flex h="100%" bg="dark.60" borderRadius={15}></Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
