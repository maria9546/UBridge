import React from 'react'
import Logo from '../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faSkype } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <img src={Logo} alt=''/>
      <a href="https://www.facebook.com/your-page" className="fa fa-facebook"><FontAwesomeIcon icon={faFacebook}/></a>
      <a href="https://www.twitter.com/your-page" className="fa fa-twitter"><FontAwesomeIcon icon={faTwitter} /></a>
      <a href="https://www.youtube.com/your-channel" className="fa fa-youtube"><FontAwesomeIcon icon={faYoutube} /></a>
      <a href="skype:your-skype-id?call" className="fa fa-skype"><FontAwesomeIcon icon={faSkype}/></a>
      {/* </div> */}
      <span>@UBridge</span>
    </footer>
  )
}

export default Footer
