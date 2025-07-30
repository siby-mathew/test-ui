import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { AnalyticCard } from "@components/AnalyticCard";

import SolanaLogo from "@assets/solana.png";
import { BsPeopleFill } from "react-icons/bs";
import { AnalyticsHeader } from "@components/AnalyticsHeader";
import { RewardsProfile } from "@components/RewardsProfile";
import { AnalyticsList } from "@components/AnalyticsList";
import { useProfile } from "@hooks/useProfile";

export const ReferralDashboard = () => {
  const { data } = useProfile();
  return (
    <Box color="white" p={4} w="100%">
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
          <AnalyticCard icon={SolanaLogo} label="Mail claimed" value="0" />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <AnalyticCard
            icon={BsPeopleFill}
            label="Friends Referred"
            value={data?.referrals.count ?? ""}
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
            alignItems={"center"}
          >
            <AnalyticCard icon={SolanaLogo} label="Claimable $MAIL" value="0" />
            <AnalyticCard icon={SolanaLogo} label="Claimable $SOL" value="0" />
            <Flex>
              <Button size={"sm"} variant="green" borderRadius={20}>
                Claim all
              </Button>
            </Flex>
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
