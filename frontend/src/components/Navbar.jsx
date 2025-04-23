import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Booksy
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/Profile" className="nav-links">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a href="/books" className="nav-links">
              Books
            </a>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-links logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
