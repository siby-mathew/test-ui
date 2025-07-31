import {
  chakra,
  Flex,
  Icon,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useClipboard,
} from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";
import { useProfile } from "@hooks/useProfile";
import { IconType } from "react-icons";
import { BsTelegram } from "react-icons/bs";

import { ClipboardText } from "@components/ClipboardText";
import { useMemo } from "react";
import { FaCopy } from "react-icons/fa6";
import { TbCopyCheckFilled } from "react-icons/tb";
import { getTelegramLink, getWhatsAppLink } from "@utils/string";
const ShareButton: React.FC<{
  link?: string;
  icon: IconType;
  color?: string;
}> = ({ link, icon, color }) => {
  return (
    <Flex
      fontSize={20}
      justifyContent={"center"}
      alignItems={"center"}
      color={color}
      boxSize={"40px"}
      as={Link}
      href={link}
      target="_blank"
      transition={"all ease .2s"}
      _hover={{
        opacity: 0.5,
      }}
      onClick={(e) => {
        if (!link) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <Icon as={icon} />
    </Flex>
  );
};

export const ShareReferralCode: React.FC<Omit<ModalProps, "children">> = ({
  onClose,
  ...props
}) => {
  const { data } = useProfile();

  const URL = useMemo(() => {
    return ` ${window.location.origin}/?r=${data?.referral_code ?? ""}`;
  }, [data?.referral_code]);

  const { onCopy, hasCopied } = useClipboard(data?.referral_code ?? "");

  const message = useMemo(() => {
    return `Hey!

I’m using this amazing platform and I think you’ll love it too.

Use my referral code: **${data?.referral_code ?? ""}** to sign up and get exclusive rewards or bonuses!

Start here  ${URL}

Let’s grow together `;
  }, [URL, data?.referral_code]);
  return (
    <Modal isCentered {...props} onClose={onClose}>
      <ModalOverlay />
      <ModalContent position={"relative"} color={"light.100"} borderRadius={5}>
        <ModalHeader textAlign={"center"}>
          Refer and Earn
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={0}>
          <Flex textAlign={"center"} mb={4} opacity={0.5}>
            Start referring today and turn your network into rewards!
          </Flex>
          <Flex
            position={"relative"}
            data-group
            borderRadius={5}
            transition={"all ease .2s"}
            _hover={{
              background: "surface.200",
              color: "green.500",
            }}
          >
            <Input
              fontSize={18}
              borderRadius={5}
              border="dashed 1px"
              borderColor={"surface.500"}
              p="4"
              variant={"unstyled"}
              value={data?.referral_code}
              fontWeight={"medium"}
            />
            <Flex
              position={"absolute"}
              right={0}
              top={0}
              bottom={0}
              alignItems={"center"}
              justifyContent={"center"}
              w="50px"
              transition={"all ease .2s"}
              cursor={"pointer"}
              onClick={onCopy}
              _groupHover={{
                opacity: 0.5,
              }}
            >
              <Icon as={hasCopied ? TbCopyCheckFilled : FaCopy} />
            </Flex>
          </Flex>
          <Flex direction={"column"} w="100%" my={4}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              Share
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <chakra.span
                bg="surface.200"
                p={"3px"}
                px={4}
                borderRadius={20}
                fontSize={12}
              >
                <ClipboardText trim={!1} textToCopy={URL}>
                  {URL}
                </ClipboardText>
              </chakra.span>
            </Flex>
            <Flex>
              <Flex w="100%" justifyContent={"center"} alignItems={"center"}>
                <ShareButton
                  color="#25d366"
                  link={getWhatsAppLink({ message })}
                  icon={IoLogoWhatsapp}
                />
                <ShareButton
                  color="#25a3e2"
                  link={getTelegramLink({ message, link: URL })}
                  icon={BsTelegram}
                />
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
