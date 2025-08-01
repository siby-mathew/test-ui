import {
  Flex,
  Icon,
  Link,
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
import { shortenPrincipalId } from "@utils/string";
import { HiExternalLink } from "react-icons/hi";
import { formatTime } from "@utils/time";
import { getSolScanAccountUrl } from "@utils/string/getSolscanUrl";

const NodataTable: React.FC<{ colspan?: number }> = ({ colspan = 3 }) => {
  return (
    <Tr>
      <Td colSpan={colspan}>
        <Flex
          p={3}
          alignItems={"center"}
          justifyContent={"center"}
          opacity={0.5}
        >
          No data available
        </Flex>
      </Td>
    </Tr>
  );
};
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
                          <Td>
                            <Link
                              justifyContent={"center"}
                              alignItems={"center"}
                              display={"inline-flex"}
                              target="_blank"
                              href={getSolScanAccountUrl(item.target_user)}
                            >
                              {shortenPrincipalId(item.target_user)}
                              <Icon ml={1} as={HiExternalLink} />
                            </Link>
                          </Td>
                          <Td>{formatTime(item.timestamp)}</Td>
                          <Td>{item.reward_amount}</Td>
                        </Tr>
                      );
                    })}

                  {(!data?.referrals || !data?.referrals?.count) && (
                    <NodataTable />
                  )}
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

                  {(!data?.xp || !data?.xp?.transactions?.length) && (
                    <NodataTable />
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
