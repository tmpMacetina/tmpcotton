import React from "react";
import { NavLink } from "react-router-dom";
import "./HomeHeader.scss";
import ladyImg from "../../../assets/lady.png";
import cottonImg from "../../../assets/cotton-min.png";
// presentational component, something like a header just for home page,not a good name I know...
const HeaderImage = () => {
  return (
    <div className="homeheader">
      <img
        src={ladyImg}
        alt="header-lady"
        className="lady-img  animated appear"
      />
      <div className="homeheader-text animated  fade-in-left">
        <div className="homeheader-text-quote">
          We offer the finest COTTON products
        </div>
        <NavLink
          className="homeheader-button animated-small-delay fade-in-left"
          to="/allproducts"
        >
          Click here to see our offer
        </NavLink>
      </div>

      <img
        src={cottonImg}
        alt="header-cotton"
        className="cotton-img  animated  appear"
      />
    </div>
  );
};

export default HeaderImage;
