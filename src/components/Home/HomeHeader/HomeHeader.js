import React from "react";
import { NavLink } from "react-router-dom";
import ladyImg from "../../../assets/lady.png";
import cottonImg from "../../../assets/cotton-min.png";
import "./HomeHeader.scss";
import "../../../styles/Animations.scss";
// presentational component, with images and link to all products, not a good name I know...
const HeaderImage = () => {
  return (
    <div className="homeheader">
      <img
        src={ladyImg}
        alt="header-lady"
        className="lady-img  animated appear"
      />
      <div className="offer animated  fade-in-left">
        <div className="offer-text">We offer the finest COTTON products</div>

        <NavLink
          className=" animated-small-delay fade-in-left"
          to="/allproducts"
        >
          <div className="offer-button">Click here to see our offer </div>
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
