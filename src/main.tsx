import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { AppTheme } from "@theme/index";
const router = createRouter({ routeTree });
import { PrivyProvider, type WalletListEntry } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "@integrations/idl/graphql";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import * as Sentry from "@sentry/react";

import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

const queryclient = new QueryClient();

Sentry.init({
  dsn: import.meta.env.VITE_SOLMAIL_SENTRY_DSN,
  sendDefaultPii: true,
});

export const ALL_SUPPORTED_WALLETS: WalletListEntry[] = [
  "metamask",
  "coinbase_wallet",
  "rainbow",
  "phantom",
  "zerion",
  "cryptocom",
  "uniswap",
  "okx_wallet",
  "universal_profile",
  "detected_wallets",
  "detected_solana_wallets",
  "detected_ethereum_wallets",
  "wallet_connect",
  "rabby_wallet",
  "bybit_wallet",
  "ronin_wallet",
  "haha_wallet",
  "safe",
  "solflare",
  "backpack",
  "binance",
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DevTools />
    <QueryClientProvider client={queryclient}>
      <ApolloProvider client={client}>
        <PrivyProvider
          appId={import.meta.env.VITE_SOLMAIL_PRIVY_APP_ID}
          config={{
            externalWallets: {
              solana: { connectors: toSolanaWalletConnectors() },
            },
            appearance: {
              showWalletLoginFirst: !0,
              walletList: ALL_SUPPORTED_WALLETS,
            },
            loginMethods: ["email", "wallet", "google"],
            embeddedWallets: {
              solana: {
                createOnLogin: "all-users",
              },
            },

            legal: {
              termsAndConditionsUrl: "/?t",
              privacyPolicyUrl: "/?p",
            },
          }}
        >
          <ToastContainer hideProgressBar theme="dark" autoClose={3500} />
          <ChakraProvider theme={AppTheme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </PrivyProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </StrictMode>
);
