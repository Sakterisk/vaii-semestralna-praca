import React, { useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';

function Navbar({ setPageContent }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(() => {
        setAuth({ isLoggedIn: false, role: null });
      })
      .catch(error => {
        console.error(error);
      });
    setPageContent("aboutme");
    setAuth({ isLoggedIn: false, role: null });
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-small">
          <div className="navbar-toggler" onClick={toggleMenu}>
            ☰
          </div>
          <div className="auth-icon">            
            {auth.isLoggedIn ? (
              <button className="nav-button" onClick={handleLogout}>
                <i className="login-icon fa fa-sign-out"></i>
              </button>
            ) : (
              <button className="nav-button" onClick={() => setPageContent("login")}>
                <i className="login-icon fa fa-sign-in"></i>
              </button>
            )}
          </div>
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <div>
            <button className="nav-button" onClick={() => setPageContent("aboutme")}>
              About Me
            </button>
          </div>
          <div>
            <button className="nav-button" onClick={() => setPageContent("mywork")}>
              My Work
            </button>
          </div>

          {auth.isLoggedIn && auth.role === 'user' && (
            <div>
              <button className="nav-button" onClick={() => setPageContent("contact")}>
                Contact
              </button>
            </div>
          )}

          {auth.isLoggedIn && auth.role === 'admin' && (
            <div>
              <button className="nav-button" onClick={() => setPageContent("adminpanel")}>
                Admin Panel
              </button>
            </div>
          )}

        </div>

          <div className="auth-text">
            {auth.isLoggedIn ? (
              <button className="nav-button" onClick={handleLogout}>
                <span className='login-text'>Logout</span>
              </button>
            ) : (
              <button className="nav-button" onClick={() => setPageContent("login")}>
                <span className='login-text'>Login</span>
              </button>
            )}
          </div>

      </nav>
    </header>
  );
};

export default Navbar;