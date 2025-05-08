import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import ReadBooks from "./pages/ReadBooks";
import Layout from "./components/Layout";
import Search from "./pages/Search";

const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:key" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/read" element={<ReadBooks />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRouter;
