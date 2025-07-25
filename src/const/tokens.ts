import type { Token } from "src/types";
import SolanaTokenLogo from "@assets/Solana-Token-Logo.png";
import PayPalUSDTokenLogo from "@assets/paypalusd.png";
import USDCTokenLogo from "@assets/USDC-Token-Logo.png";
export const tokens: Token[] = [
  {
    id: "SOL",
    name: "Solana",
    symbol: "SOL",
    logo: SolanaTokenLogo,
    address: "SOL",
    decimals: 9,
  },
  {
    id: import.meta.env.VITE_SOLMAIL_USDC,
    name: "USDC",
    symbol: "USDC",
    logo: USDCTokenLogo,
    address: import.meta.env.VITE_SOLMAIL_USDC,
    decimals: 6,
  },
  {
    id: import.meta.env.VITE_SOLMAIL_PYUSD,
    name: "PayPal USD",
    symbol: "PYUSD",
    logo: PayPalUSDTokenLogo,
    address: import.meta.env.VITE_SOLMAIL_PYUSD,
    decimals: 6,
  },
];
