import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BookDetailsPage from "./pages/BookDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ReadBooksPage from "./pages/ReadBooksPage";
import SearchPage from "./pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "read", element: <ReadBooksPage /> },
      { path: "book/*", element: <BookDetailsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
