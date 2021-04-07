import React from "react";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo.png";
import "./Footer.scss";
// presentational footer component
const Footer = () => {
  return (
    <div className="footer">
      <div className="about">
        <h1 className="about-title">About us:</h1>
        <p>
          &#32;COTTON is one of the largest international fashion companies. It
          belongs to Itex, one of the world’s largest distribution groups. The
          customer is at the heart of our unique business model, which includes
          design, production, distribution and sales of 100% cotton products
          through our extensive retail network.We use organic cotton from our
          cotton farms that follow highest standards. &#32;
        </p>
        <div className="social">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FB"
          >
            <FaFacebook className="facebook" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="insta"
          >
            <FaInstagramSquare className="instagram" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twiter"
          >
            <FaTwitter className="twitter" />
          </a>
          <p>Follow us !</p>
        </div>
      </div>
      <div className="footer-logo">
        <img className="logo-img" src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default Footer;
