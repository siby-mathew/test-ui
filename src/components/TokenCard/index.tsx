import { chakra, Flex, Icon, Image, Tooltip } from "@chakra-ui/react";
import { BASE_TOKEN } from "@const/tokens";
import { FormattedTokens } from "@hooks/useTokensOwned";
import { formatTokenBalance, formatUsdValue } from "@utils/formating";
import { FaCircleInfo } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export const TokenCard: React.FC<FormattedTokens> = ({
  name,
  amount,
  symbol,
  icon,
  decimals,
  price,
  mint,
}) => {
  return (
    <Flex
      flexDirection={"row"}
      w="100%"
      gap={2}
      p={3}
      borderRadius={8}
      cursor={"pointer"}
      transition={"all ease .2s"}
    >
      <Flex boxSize={"40px"} bg="surface.300" borderRadius={"50%"}>
        <Image
          borderRadius={"50%"}
          src={icon ?? ""}
          boxSize={"100%"}
          objectFit={"cover"}
          alt={name ?? ""}
          opacity={0}
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        />
      </Flex>

      <Flex flex={"auto"} direction={"column"}>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Flex fontWeight={"bold"}>{symbol ?? ""}</Flex>
          <Flex fontWeight={"bold"}>
            <chakra.span>{formatUsdValue(price?.usdPrice ?? 0)}</chakra.span>
          </Flex>
        </Flex>
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Flex opacity={0.5}>
            {formatTokenBalance({
              rawAmount: amount,
              mintDecimals: decimals ?? 9,
              decimals: 2,
              suffix: symbol ?? "",
            })}
          </Flex>
          <Flex>
            {price && price?.priceChange24h && (
              <chakra.span
                display={"inline-flex"}
                alignItems={"center"}
                fontSize={13}
                color={price?.priceChange24h < 0 ? "red.500" : "green.500"}
              >
                <Icon
                  as={
                    price?.priceChange24h < 0
                      ? TiArrowSortedDown
                      : TiArrowSortedUp
                  }
                />
                {price?.priceChange24h.toFixed(2) ?? ""}%
              </chakra.span>
            )}

            {import.meta.env.MODE === "development" &&
              mint !== BASE_TOKEN.mint && (
                <Tooltip
                  placement="right"
                  label="Prices are only available for mainnet tokens"
                >
                  <Icon color={"red.500"} as={FaCircleInfo} />
                </Tooltip>
              )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
