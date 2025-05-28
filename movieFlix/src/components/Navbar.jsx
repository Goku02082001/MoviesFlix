import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z"/>
            <path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11.01Z"/>
            <path d="m6.6 4.99 3.38 4.2"/>
            <path d="m11.86 3.38 3.38 4.2"/>
          </svg>
          <span>CineFlix</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="nav-link" onClick={() => setMenuOpen(false)}>
              Movies
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/movies/add" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Add Movie
                </Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li className="user-greeting">
                Hello, {user?.username}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-btn" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;