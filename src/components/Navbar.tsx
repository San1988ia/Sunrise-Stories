import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/components/_navbar.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
      <h1>Sunrise Stories</h1>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul>
        <li>
          <NavLink to="/" end>
            Hem
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">Sök</NavLink>
        </li>
        <li>
          <NavLink to="/Favorites">Favoriter</NavLink>
        </li>
        <li>
          <NavLink to="/read">Lästa</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
