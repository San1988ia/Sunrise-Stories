import React from "react";
import ReactDOM from "react-dom/client";
import { LibraryProvider } from "./context/LibraryContext.tsx";
import AppRouter from "./router";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LibraryProvider>
      <AppRouter />
    </LibraryProvider>
  </React.StrictMode>
);
