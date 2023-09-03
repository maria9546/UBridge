import React from 'react';
import Logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faSkype } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={Logo} alt="UBridge Logo" />
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/your-page" className="social-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com/your-page" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.youtube.com/your-channel" className="social-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="skype:your-skype-id?call" className="social-icon">
            <FontAwesomeIcon icon={faSkype} />
          </a>
        </div>
      </div>
      <div className="copyright">
        <span>&copy; UBridge</span>
      </div>
    </footer>
  );
}

export default Footer;
