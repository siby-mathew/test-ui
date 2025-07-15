import { Box, VStack } from "@chakra-ui/react";
import { MailCard } from "@components/MailCard";

const MAILS = [
  {
    address: "DAU...xtK",
    subject: "This is sample mail for testing",
    body: "Hi team, Rahul has invited you to edit the following spreadsheet",
    time: "1 day ago",
  },
  {
    address: "USX...xtK",
    subject:
      "TBooking OTP confirmation On Behalf Of POPULAR MOTOR WORLD PVT LTD",
    body: "Dear Customer, Congratulations on booking of Hyundai Car, Please share this verification code 183625 with Dealership to confirm your Car Booking in system",
    time: "1 day ago",
  },
  {
    address: "KAU...xtK",
    subject: "Need cashless car repairs & instant claim approval?",
    body: "The Tata Tigor EV has already been available in India for some time now. However, the EV was on offer only for government institutions and fleet operators. But now, the Indian automobile manufacturer has brought out the Tigor EV with an extended range, which can also be purchased by individual customers..",
    time: "7 day ago",
    file: "job_offer.pdf",
  },
  {
    address: "GAU...xtK",
    subject: "Hong Kong local media reports first coronavirus death Moment",
    body: "Exclusion to Personal Accident covers: 1) Intentional Self injury, suicide or attempted suicide, physical defect or infirmity. 2) Accident happening while such Person is under the influence of intoxicating liquor or drug.ICICI trade logo displayed above belongs to ICICI Bank and is used by ICICI Lombard GIC Ltd. under license and Lombard logo belongs to ICICI Lombard GIC Ltd. The advertisement contains only an indication of cover offered. For more details on risk factors, terms, conditions and exclusions, please read the sales brochure / policy wordings carefully before concluding a sale.",
    time: "8 day ago",
  },
  {
    address: "ZAU...xtK",
    subject:
      "Request for Assistance with Linking Aadhaar to PF Account and Account",
    body: `Hi ,
I hope this message finds you well. I am writing to address an issue concerning my Provident Fund (PF) account, which requires your urgent attention.

I have been encountering difficulties logging into my PF account due to the non-linkage of my Aadhaar number. My PF account was established in 2014 during my tenure with Muziris Technologies. Since then, I have transitioned to a new organization, where the process of updating my Aadhaar details has proven to be challenging.`,
    time: "15 day ago",
    file: "Bank_Sta...2025.pdf",
  },
];
export const Inbox: React.FC = () => {
  return (
    <Box
      bg="surface.400"
      w="full"
      borderRight={"solid 1px"}
      borderRightColor={"surface.400"}
      borderBottomLeftRadius={21}
      // borderRightRadius={0}
    >
      {/* <Box px={2}>
        <Input
          bg="surface.400"
          border={"none"}
          placeholder={"Search"}
          h="45px"
          borderRadius={8}
        />
      </Box> */}
      <Box pt={3}>
        <VStack maxW={360} h="100%" px={2}>
          {MAILS.map((item) => {
            return <MailCard {...item} />;
          })}
        </VStack>
      </Box>
    </Box>
  );
};
