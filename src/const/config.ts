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
export const DOCS_URL = `/docs`;
