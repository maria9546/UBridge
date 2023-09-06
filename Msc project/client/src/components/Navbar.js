import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../img/logo.png';

function Navbar() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('userData');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData ? userData.userId : null;


  const handleLogout = () => {
    localStorage.removeItem('userData');
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt='' />
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>HOME</h6>
          </Link>
          <Link className="link" to="/service">
            <h6>SERVICES</h6>
          </Link>
          <Link className="link" to="/blog">
            <h6>BLOGS</h6>
          </Link>
          <Link className="link" to="/contact">
            <h6>CONTACT</h6>
          </Link>
          {isLoggedIn ? (
            <>
                <Link className="link" to={userId ? `/profile/${userId}` : '/login'}>
                  <h6>PROFILE</h6>
                </Link>
              <Link className="link" to="/logout" onClick={handleLogout}>
                <h6>LOGOUT</h6>
              </Link>
            </>
          ) : (
            <>
              {location.pathname === '/login' ? (
                <Link className="link" to="/register">
                  <h6>REGISTER</h6>
                </Link>
              ) : location.pathname === '/register' ? (
                <Link className="link" to="/login">
                  <h6>LOGIN</h6>
                </Link>
              ) : (
                <Link className="link" to="/register">
                  <h6>SIGNIN/SIGNOUT</h6>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
