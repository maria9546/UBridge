import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import Logo from "../img/logo.png"

function Navbar() {
  const location = useLocation();

  const showSignIn = ['/','/blog','/register','/login','/contact'].includes(location.pathname)
  const showLogout = location.pathname.startsWith('/profile/') || location.pathname.startsWith('/messages/');   

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt=''/>
        </div>
        <div className='links'>
          <>
          <Link className='link' to="">
            <h6>HOME</h6>
          </Link>
          <a className="link" href="/#service">
            <h6>SERVICES</h6>
          </a>
          <Link className='link' to="/blog">
            <h6>BLOGS</h6>
          </Link>
          <Link className='link' to="/contact">
            <h6>CONTACT</h6>
          </Link>
          </>
          {showSignIn && (
            <Link className='link' to='/register'>
              <h6>SIGNUP/SIGNIN</h6>
            </Link>
          )}
          {showLogout &&(
            <Link className='link' to='/logout'>
              <h6>LOGOUT</h6>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

       