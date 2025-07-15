import {
  Box,
  Flex,
  type BoxProps,
  Image,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { BsFillFilePdfFill } from "react-icons/bs";

const Avatar: React.FC<{ name: string } & BoxProps> = ({
  name = "",
  ...boxProps
}) => {
  return (
    <Flex
      boxSize={"30px"}
      bg="surface.500"
      borderRadius={"50%"}
      fontWeight={"bold"}
      left={0}
      top={0}
      position={"absolute"}
      {...boxProps}
      alignItems={"center"}
      justifyContent={"center"}
      as={Image}
      src={`https://picsum.photos/15/15?id=${name}`}
    />
  );
};

export const MailCard: React.FC<any> = ({
  address,
  body,
  subject,
  file,
  time,
}) => {
  return (
    <Box
      p={2}
      w="full"
      pl="50px"
      position={"relative"}
      cursor={"pointer"}
      transition={"all ease .2s"}
      borderRadius={10}
      fontSize={14}
      pr={5}
      _hover={{
        bg: "surface.300",
      }}
      //   borderBottom={"solid 1px "}
      //   borderBottomColor={"surface.400"}
    >
      <Avatar bg={`surface.500`} top={2} left={"10px"} name={address} />
      <Flex mb={"2px"} justifyContent={"space-between"} opacity={0.5}>
        <Flex>{address}</Flex>
        <Flex fontSize={12}>{time}</Flex>
      </Flex>
      <Box
        maxW={"100%"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        // fontWeight={"medium"}
      >
        {subject}
      </Box>
      <Box opacity={0.4} fontSize={12}>
        {body?.slice(0, file ? 30 : 70)}...
      </Box>
      {file && (
        <Flex alignItems={"center"} mt={2}>
          <Icon color={"red.500"} as={BsFillFilePdfFill} mr={2} />
          <chakra.span opacity={0.5}>{file}</chakra.span>
        </Flex>
      )}
    </Box>
  );
};
