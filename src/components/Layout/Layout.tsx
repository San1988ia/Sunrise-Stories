import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        © 2025 Sunrise Stories · Sania Dehghani Ekengren · All rights reserved
      </footer>
    </div>
  );
};

export default Layout;
