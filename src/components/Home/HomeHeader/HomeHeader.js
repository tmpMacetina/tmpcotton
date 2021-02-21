import React from "react";
import { NavLink } from "react-router-dom";
import ladyImg from "../../../assets/lady.png";
import cottonImg from "../../../assets/cotton-min.png";
import "./HomeHeader.scss";
import "../../../styles/Animations.scss";
// presentational component, something like a header just for home page,not a good name I know...
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
        <div className="offer-button">
          <NavLink
            className=" animated-small-delay fade-in-left"
            to="/allproducts"
          >
            Click here to see our offer
          </NavLink>
        </div>
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
