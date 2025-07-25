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
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const AnalyticsList: React.FC = () => {
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
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
