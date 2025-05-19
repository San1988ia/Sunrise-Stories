import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { LibraryProvider } from "./context/LibraryContext.tsx";
import { router } from "./router";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LibraryProvider>
      <RouterProvider router={router} />
    </LibraryProvider>
  </React.StrictMode>
);
