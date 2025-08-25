import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { LuQrCode } from "react-icons/lu";
import { FiArrowUpRight } from "react-icons/fi";
import { ShareAddress } from "@components/ShareAddress";
import { Link, Outlet } from "@tanstack/react-router";
import isFunction from "lodash/isFunction";

import { CustomScrollbarWrapper } from "@components/ScrollWrapper";

import { TiThListOutline } from "react-icons/ti";
import { usePortfolioValue } from "@hooks/usePortfolioValue";
import { formatUsdValue } from "@utils/formating";

const MenuButton: React.FC<{
  name: string;
  icon: IconType;
  link?: string;
  onClick?: () => void;
}> = ({ name, icon, onClick, link }) => {
  const onClickHandler = () => {
    if (isFunction(onClick)) {
      onClick();
    }
  };

  return (
    <Flex
      direction={"column"}
      boxSize={"70px"}
      bg="surface.600"
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={5}
      fontSize={13}
      transition={"all ease .2s"}
      onClick={onClickHandler}
      position={"relative"}
      _hover={{
        bg: "surface.700",
      }}
      cursor={"pointer"}
      as={LinkBox}
    >
      <Flex my={2} color={"green.500"}>
        <Icon fontSize={25} as={icon} />
      </Flex>
      <Flex>{name}</Flex>
      {link && <LinkOverlay as={Link} to={link} />}
    </Flex>
  );
};
export const WalletLayout: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usd, isLoading, solana } = usePortfolioValue();

  return (
    <Flex as={Container} maxW={"100%"} py={5} w="100%">
      <CustomScrollbarWrapper>
        <ShareAddress isOpen={isOpen} onClose={onClose} />
        <Flex
          direction={"column"}
          alignItems={"center"}
          w="100%"
          py={5}
          textAlign={"center"}
        >
          <Flex direction={"column"}>
            <chakra.span fontWeight={"bold"} fontSize={25}>
              <Skeleton
                startColor="surface.900"
                endColor="surface.300"
                minW={50}
                isLoaded={!isLoading}
              >
                {formatUsdValue(usd)}
              </Skeleton>
            </chakra.span>
            {solana && solana.address && (
              <Flex>
                {`1 ${solana?.symbol} ≈ ${formatUsdValue(solana?.price?.usdPrice ?? 0)}`}
              </Flex>
            )}
          </Flex>
        </Flex>

        <Box w="100%">
          <HStack align={"center"} justifyContent={"center"}>
            <MenuButton
              name="Overview"
              icon={TiThListOutline}
              link="/u/wallet/activity/assets"
            />
            <MenuButton name="Receive" icon={LuQrCode} onClick={onOpen} />
            <MenuButton
              name="Send"
              icon={FiArrowUpRight}
              link="/u/wallet/pay"
            />
          </HStack>
        </Box>
        <Box p={5}>
          <Outlet />
        </Box>
      </CustomScrollbarWrapper>
    </Flex>
  );
};
