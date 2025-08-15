import { Flex, Icon, Image, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { BASE_TOKEN } from "@const/tokens";
import { usePrivyWallet } from "@hooks/usePrivyWallet";
import { useTokenMeta } from "@hooks/useTokensOwned";
import { formatTokenBalance } from "@utils/formating";
import { shortenPrincipalId } from "@utils/string";
import { getSolScanTxUrl } from "@utils/string/getSolscanUrl";
import { formatTime } from "@utils/time";
import { TbExternalLink } from "react-icons/tb";

type TransferCard = {
  transaction: any;
};
export const TransferCard: React.FC<TransferCard> = ({ transaction }) => {
  const { address } = usePrivyWallet();
  const IS_TOKEN_TRANSFER =
    transaction &&
    transaction.tokenTransfers &&
    transaction.tokenTransfers.length > 0;
  const mintAddress = IS_TOKEN_TRANSFER
    ? transaction.tokenTransfers[0].mint
    : BASE_TOKEN.mint;

  const { token } = useTokenMeta(mintAddress);
  const isCredit = address && address !== transaction?.feePayer;
  const amount = IS_TOKEN_TRANSFER
    ? transaction.tokenTransfers[0].tokenAmount
    : transaction?.nativeTransfers?.[0].amount;
  return (
    <Flex
      direction={"row"}
      as={LinkBox}
      w="100%"
      gap={3}
      color={"light.100"}
      transition={"all ease .2s"}
      p={2}
      borderRadius={8}
      _hover={{
        bg: "surface.900",
      }}
    >
      <Flex w="40px">
        <Image
          objectFit={"cover"}
          src={token?.logo}
          alt={token?.name}
          borderRadius={"50%"}
          boxSize="40px"
        />
      </Flex>
      <Flex direction={"column"} flex={"auto"}>
        <Flex justifyContent={"space-between"}>
          <Flex fontWeight={"bold"}>{token?.symbol}</Flex>
          <Flex
            color={isCredit ? "green.500" : "red.500"}
            fontSize={16}
            fontWeight={"bold"}
          >
            {formatTokenBalance({
              rawAmount: amount,
              mintDecimals: token?.decimals ?? 9,
            })}
          </Flex>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Flex opacity={0.5}>{formatTime(transaction.timestamp * 1000)}</Flex>
          <Flex fontSize={13} alignItems={"center"}>
            {shortenPrincipalId(transaction?.signature ?? "")}
            <Icon ml={2} as={TbExternalLink} />
          </Flex>
        </Flex>
      </Flex>
      <LinkOverlay
        target="_blank"
        href={getSolScanTxUrl(transaction?.signature ?? "")}
      />
    </Flex>
  );
};
export const ActivityCard: React.FC<{ transaction: any }> = ({
  transaction,
}) => {
  if (transaction.type === "TRANSFER") {
    return <TransferCard transaction={transaction} />;
  }
};
