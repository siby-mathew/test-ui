import { chakra, Flex, Icon, Link } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import {
  DOCS_URL,
  INSTAGRAM_URL,
  TELEGRAM_URL,
  TWITTER_URL,
} from "@const/config";

const SOCIAL_LINKS = [
  {
    icon: FaXTwitter,
    name: "Twitter",
    link: TWITTER_URL,
  },
  {
    icon: BsTelegram,
    name: "Telegram",
    link: TELEGRAM_URL,
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    link: INSTAGRAM_URL,
  },
  {
    icon: null,
    name: "Docs",
    link: DOCS_URL,
  },
];
export const SocialShare: React.FC = () => {
  return (
    <Flex direction={"row"} gap={3} alignItems={"center"} my={4}>
      {SOCIAL_LINKS.map((option) => {
        return (
          <Link
            target="_blank"
            href={option.link}
            display={"inline-flex"}
            _hover={{
              opacity: 0.7,
            }}
          >
            {option.icon && <Icon as={option.icon as any} />}
            {!option.icon && <chakra.span>{option.name}</chakra.span>}
          </Link>
        );
      })}
    </Flex>
  );
};
