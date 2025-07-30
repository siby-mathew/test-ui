import {
  Flex,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useProfile } from "@hooks/useProfile";

import { formatTime } from "@utils/time";
export const AnalyticsList: React.FC = () => {
  const { data } = useProfile();
  return (
    <Flex bg="dark.60" borderRadius={15} p={5}>
      <Tabs w="100%">
        <TabList>
          <Tab>Referrals</Tab>
          <Tab>Activity</Tab>
        </TabList>

        <TabPanels w="100%">
          <TabPanel w="100%">
            <TableContainer>
              <Table size="sm">
                <Thead bg="#D9D9D91A">
                  <Tr>
                    <Th>Address</Th>
                    <Th>Date Joined</Th>
                    <Th>Points Earned</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.referrals &&
                    data?.referrals?.count > 0 &&
                    data?.referrals?.users.map((item) => {
                      return (
                        <Tr>
                          <Td>{item.target_user}</Td>

                          <Td>{formatTime(item.timestamp)}</Td>
                          <Td>{item.reward_amount}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer>
              <Table size="sm">
                <Thead bg="#D9D9D91A">
                  <Tr>
                    <Th>Amount</Th>

                    <Th>Date Joined</Th>
                    <Th>Activity</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.xp &&
                    data?.xp?.transactions?.length > 0 &&
                    data?.xp?.transactions.map((item) => {
                      return (
                        <Tr>
                          <Td>{item.amount}</Td>
                          <Td>{formatTime(item.timestamp)}</Td>
                          <Td>{item.event_type}</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
