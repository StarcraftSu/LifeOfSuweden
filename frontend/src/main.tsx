import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import { store } from "./store/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
);
