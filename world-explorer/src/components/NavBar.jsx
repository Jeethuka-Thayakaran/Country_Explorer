import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    if (storedUsername && storedToken) {
      setUser({ username: storedUsername });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    //setFavoriteCodes([]);
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="home-title">🌍 Explore Countries</Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          {/* <Link to="/about" className="navbar-link">About</Link> */}
          {/* <Link to="/contact" className="navbar-link">Contact</Link> */}

          {user && (
            <Link to="/favorites" className="navbar-link">Favorites</Link>
          )}

          {user && (
            <div className="navbar-user">
              <span className="navbar-link">Hi, {user.username}</span>
              <span className="status-dot" />
            </div>
          )}

          {!user && (
            <div className="navbar-user">
              <span className="status-dotred" />
            </div>
          )}

          {user ? (
            <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                handleLogout();
              }
            }}
            className="navbar-btn logout-btn"
          >
            Logout
          </button>
          
          ) : (
            <Link
              to="/login"
              className="navbar-btn login-btn"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
