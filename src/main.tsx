import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { AppTheme } from "@theme/index";
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={AppTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
