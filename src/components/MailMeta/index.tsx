import { chakra, Flex, Icon, Image, Link } from "@chakra-ui/react";

import { useMailBoxContext } from "@hooks/useMailBoxContext";
import { shortenPrincipalId } from "@utils/string";
import { getSolScanAccountUrl } from "@utils/string/getSolscanUrl";

import { IoMdMail } from "react-icons/io";
import { RiExternalLinkLine } from "react-icons/ri";
import SolScan from "@assets/soscan.png";
import { useMemo } from "react";
export const MailMeta: React.FC = () => {
  const { id } = useMailBoxContext();

  const links = useMemo(
    () => [
      {
        icon: IoMdMail,
        link: getSolScanAccountUrl(id ?? ""),
        label: shortenPrincipalId(id),
      },
    ],
    [id]
  );
  return (
    <Flex
      direction={"row"}
      flexWrap={"wrap"}
      fontSize={12}
      borderTop={"solid 1px"}
      borderTopColor={"surface.400"}
      py={5}
      gap={3}
      alignItems={"center"}
      mt={3}
    >
      <Image boxSize={"14px"} src={SolScan} alt="Solscan" />

      {links.map(({ icon, label, link }) => {
        return (
          <Link
            textDecoration={"underline"}
            href={link}
            target="_blank"
            alignItems={"center"}
            display={"inline-flex"}
            key={label}
            opacity={0.5}
            _hover={{
              opacity: 1,
              color: "green.500",
            }}
          >
            <Icon as={icon} mr={1} />
            <chakra.span>{label}</chakra.span>
            <Icon ml={1} as={RiExternalLinkLine} />
          </Link>
        );
      })}
    </Flex>
  );
};
