import { Flex, Icon, Image } from "@chakra-ui/react";
import { IconType } from "react-icons";

type AnalyticCardProps = {
  label: string;
  value: string | number;
  formater?: (value: string) => string;
  icon: string | IconType;
};
export const AnalyticCard: React.FC<AnalyticCardProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <Flex
      p={4}
      bg="dark.60"
      borderRadius={15}
      h="100%"
      transition={"all ease .2s"}
      cursor={"pointer"}
      flex={"auto"}
      _hover={{
        opacity: 0.8,
      }}
    >
      <Flex direction={"row"} alignItems={"center"}>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          boxSize="55px"
          bg="dark.70"
          borderRadius={"50%"}
          minW={"55px"}
        >
          {icon && (
            <>
              {typeof icon === "string" && (
                <Image borderRadius={"50%"} src={icon} />
              )}
              {typeof icon !== "string" && <Icon fontSize={20} as={icon} />}
            </>
          )}
        </Flex>
        <Flex direction={"column"} px={2}>
          <Flex opacity={0.5}>{label}</Flex>
          <Flex fontWeight={"bold"} fontSize={20}>
            {value}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
