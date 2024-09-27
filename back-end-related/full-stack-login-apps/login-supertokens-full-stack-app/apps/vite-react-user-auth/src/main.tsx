import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyPasswordless from "supertokens-web-js/recipe/thirdpartypasswordless";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, Home, Root } from "./App";
import { Authentication, AuthenticationVerify } from "./Auth";

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    appName: "user-auth",
  },
  recipeList: [Session.init(), ThirdPartyPasswordless.init()],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
      {
        path: "/auth/verify",
        element: <AuthenticationVerify />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
