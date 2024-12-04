import React, { useState } from 'react';

function Navbar({ setPageContent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-toggler" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <div><button className="nav-button" onClick={() => setPageContent("aboutme")}>About Me</button></div>
          <div><button className="nav-button" onClick={() => setPageContent("mywork")}>My Work</button></div>
          <div><button className="nav-button" onClick={() => setPageContent("contact")}>Contact</button></div>
          <div><button className="nav-button" onClick={() => setPageContent("secmanager")}>Section Manager</button></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;