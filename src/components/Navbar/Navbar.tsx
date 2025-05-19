import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Navbar/Navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "";

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="nav-left">
        <h1>Sunrise Stories</h1>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="nav-right">
        <ul>
          <li>
            <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={getLinkClass} onClick={closeMenu}>
              Sök
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Favoriter
            </NavLink>
          </li>
          <li>
            <NavLink to="/read" className={getLinkClass} onClick={closeMenu}>
              Lästa
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
