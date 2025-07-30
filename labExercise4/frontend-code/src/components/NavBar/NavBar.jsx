import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import styles from './NavBar.module.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Remove user from online list
    if (user?.id) {
      userService.logout(user.id);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Blogging Platform</h2>
          </Link>
        </div>
        <div className={styles.navLinks}>
          {!isLoggedIn ? (
            location.pathname === '/login' || location.pathname === '/' ? (
              <>
                <Link to="/register" className={styles.navLink}>
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>
                  Login
                </Link>
              </>
            )
          ) : (
            <>
              <span className={styles.welcomeText}>
                Welcome, {user?.username || 'User'}!
              </span>
              {user?.role === 'admin' && location.pathname !== '/admin' && (
                <Link to="/admin" className={styles.navLink}>
                  Admin Panel
                </Link>
              )}
              {location.pathname !== '/blog' && (
                <Link to="/blog" className={styles.navLink}>
                  View Blog
                </Link>
              )}
              {location.pathname !== '/tracker' && (
                <Link to="/tracker" className={styles.navLink}>
                  Login Tracker
                </Link>
              )}
              {location.pathname !== '/profile' && (
                <Link to="/profile" className={styles.navLink}>
                  User Profile
                </Link>
              )}
              <button 
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
