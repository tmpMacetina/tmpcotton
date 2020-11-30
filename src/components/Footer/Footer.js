import React from "react";
import "./Footer.scss";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <h1>About us:</h1>&#32;COTTON is one of the largest international
        fashion companies. It belongs to Itex, one of the world’s largest
        distribution groups. The customer is at the heart of our unique business
        model, which includes design, production, distribution and sales of 100%
        cotton products through our extensive retail network.&#32;
        <div className="social">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="facebook" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare className="instagram" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="twitter" />
          </a>
          <p>Follow us !</p>
        </div>
      </div>

      <img className="footer-img" src={Logo} alt="logo" />
    </div>
  );
};

export default Footer;
