export const config = {
  SOLMAIL_CONTRACT: import.meta.env.VITE_SOLMAIL_CONTRACT_ADDRESS,
  logo: "https://solmail.so/_next/static/media/logo-only.be4816dc.png",
};

export const PINATA_GATEWAY_URL = import.meta.env.VITE_SOLMAIL_PINATA_BASE_URL;

export const MAXIMUM_MAIL_SUBJECT_LENGTH = 80;

export const RPC_ENDPOINT = `${import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT}?api-key=${import.meta.env.VITE_SOLMAIL_RPC_API_KEY}`;

export const HELIUS_API_ENDPOINT = `https://api-devnet.helius.xyz/v0/`;

export const NO_BALANCE_LABEL = `Insufficient Balance`;

export const TELEGRAM_URL = `https://t.me/solmailofficial`;
export const TWITTER_URL = `https://x.com/SolMailOfficial`;
export const INSTAGRAM_URL = `https://www.instagram.com/solmailofficial/`;
export const DOCS_URL = `https://solmail-1.gitbook.io/solmail/`;

export const PRIVACY_POLICY_LINK =
  "https://elastic-grip-d07.notion.site/Privacy-Policy-25750f9ac71680129ef5e99dc1ac860f";
export const TERMS_AND_CONDITIONS_LINK =
  "https://elastic-grip-d07.notion.site/Terms-and-conditions-25750f9ac7168058b39ded4c2316ec37";
