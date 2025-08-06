import { Flex, Icon } from "@chakra-ui/react";
import { useProfile } from "@hooks/useProfile";
import { useMemo } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export const RewardsChart = () => {
  const { data } = useProfile();

  const graphData = useMemo(() => {
    if (!data?.referrals.count) {
      return [];
    }
    const res: Record<string, number> = {};
    data.referrals.users?.map((item) => {
      const date = new Date(item.timestamp).toDateString();
      const timestamp = date.toString();
      if (!res[timestamp]) {
        res[timestamp] = 0;
      }
      res[timestamp] += 1;
    });

    const result = Object.entries(res).map(([name, rewards]) => ({
      name,
      rewards,
    }));

    return result;
  }, [data]);

  console.log(graphData);
  return (
    <Flex w="100%" h="100%" direction={"column"} p={5} fontSize={13}>
      <Flex direction={"column"}>
        <h3 style={{ color: "#fff" }}>Earned $MAIL Rewards</h3>
        <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          32,900
        </h1>
        <Flex alignItems={"center"}>
          <Icon color={"green.500"} mr={1} as={FaArrowTrendUp} /> 8% from last
          month
        </Flex>
      </Flex>
      <Flex flex={"auto"}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={[
              { day: "Sun", rewards: 2000 },
              { day: "Mon", rewards: 5000 },
              { day: "Tue", rewards: 4500 },
              { day: "Wed", rewards: 4800 },
              { day: "Thu", rewards: 4000 },
              { day: "Fri", rewards: 6000 },
              { day: "Sat", rewards: 5500 },
            ]}
          >
            <XAxis dataKey="day" stroke="#999" />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#1a1a1a", border: "none" }}
              labelStyle={{ color: "#aaa" }}
              cursor={{ stroke: "#8884d8", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="rewards"
              stroke="none"
              fill="url(#diagonalStripes)"
              mask="url(#fadeMask)"
            />
            <Line
              type="monotone"
              dataKey="rewards"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 4, fill: "#a855f7" }}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                <stop offset="60%" stopColor="#a855f7" stopOpacity={0} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>

              <pattern
                id="diagonalStripes"
                width="10"
                height="10"
                patternTransform="rotate(45)"
                patternUnits="userSpaceOnUse"
              >
                <rect width="4" height="10" fill="#fff" />
              </pattern>

              <mask id="fadeMask">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#gradient)"
                />
              </mask>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
};
