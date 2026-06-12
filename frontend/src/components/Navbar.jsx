import React, { useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';

function Navbar({ navigate, route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error(error);
    }

    setAuth({ isLoggedIn: false, role: null });
    goTo('home');
  };

  return (
    <header>
      <nav className='navbar'>
        <div className='brand' onClick={() => goTo('home')} role='button' tabIndex={0}>
          Portfolio CMS
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <button className={`nav-button ${route === 'home' ? 'active' : ''}`} onClick={() => goTo('home')}>
            Home
          </button>
          <button className={`nav-button ${route === 'projects' ? 'active' : ''}`} onClick={() => goTo('projects')}>
            Projects
          </button>
          <button className={`nav-button ${route === 'contact' ? 'active' : ''}`} onClick={() => goTo('contact')}>
            Contact
          </button>
          {auth.isLoggedIn && auth.role === 'admin' && (
            <button className={`nav-button ${route === 'admin' ? 'active' : ''}`} onClick={() => goTo('admin')}>
              CMS
            </button>
          )}
        </div>

        <div className='nav-actions'>
          <button className='menu-toggle' onClick={() => setMenuOpen((prev) => !prev)}>
            ☰
          </button>
          {auth.isLoggedIn ? (
            <button className='nav-button' onClick={handleLogout}>Logout</button>
          ) : (
            <button className='nav-button' onClick={() => goTo('login')}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
