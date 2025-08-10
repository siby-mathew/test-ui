import PrivyLogo from "@assets/privy.jpg";
import GmailLogo from "@assets/gmail.png";
import MailIcon from "@assets/mail.png";
const ICONS: Record<string, string> = {
  privy: PrivyLogo,
  gmail: GmailLogo,
  google_oauth: GmailLogo,
  "solmail.so": GmailLogo,
};
export const getWalletIcon = (name: string) => {
  const mailExtension = name.split("@")[1];
  if (Object.prototype.hasOwnProperty.call(ICONS, mailExtension)) {
    return ICONS[mailExtension];
  }
  return MailIcon;
};
