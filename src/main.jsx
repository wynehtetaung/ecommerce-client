import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ProductsProvider from "./context/ProductsProvider.jsx";
import UiStateProvider from "./context/UiStateProvider.jsx";
import UsersProvider from "./context/UsersProvider.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UiStateProvider>
      <UsersProvider>
        <ProductsProvider>
          <GoogleOAuthProvider clientId="269722995964-c8k39bjvu8r8li9bavolrjm30i6h6b3h.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </ProductsProvider>
      </UsersProvider>
    </UiStateProvider>
  </React.StrictMode>
);
