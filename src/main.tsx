import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { AppTheme } from "@theme/index";
const router = createRouter({ routeTree });
import { PrivyProvider } from "@privy-io/react-auth";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_SOLMAIL_PRIVY_APP_ID}
      config={{
        solanaClusters: [
          {
            name: "devnet",
            rpcUrl: import.meta.env.VITE_SOLMAIL_RPC_ENDPOINT,
          },
        ],
        appearance: {
          showWalletLoginFirst: !0,
          walletList: ["detected_wallets"],
        },

        loginMethods: ["email", "wallet"],
        legal: {
          termsAndConditionsUrl: "/?t",
          privacyPolicyUrl: "/?p",
        },

        embeddedWallets: {
          solana: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      <ChakraProvider theme={AppTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </PrivyProvider>
  </StrictMode>
);
