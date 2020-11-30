import React from "react";
// import headerPhoto from '../../assets/headerPhotoHR.jpg'
import { NavLink } from "react-router-dom";
import "./HomeHeader.scss";
import ladyImg from "../../assets/lady.png";
import cottonImg from "../../assets/cotton-min.png";

const HeaderImage = () => {
  return (
    <div className="homeheader">
      <img src={ladyImg} alt="header-lady" className="lady-img" />
      <div className="homeheader-text animated fadeInLeft">
        <div className="homeheader-text-quote">
          We offer the finest COTTON products
        </div>
        <NavLink
          className="homeheader-button animatedBtn fadeInLeft"
          to="/allproducts"
        >
          Click here to see our offer
        </NavLink>
      </div>

      <img src={cottonImg} alt="header-cotton" className="cotton-img" />
    </div>
  );
};

export default HeaderImage;
