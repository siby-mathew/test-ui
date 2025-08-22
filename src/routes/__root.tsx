import { AppMainLayout } from "@layouts/main";

import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: AppMainLayout,
  notFoundComponent: function () {
    return <div>oops</div>;
  },
});
