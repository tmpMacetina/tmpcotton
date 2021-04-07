import React from "react";
import "./ForThem.scss";
import { NavLink } from "react-router-dom";
import forHimImg from "../../../assets/forHimMin.jpg";
import forHerImg from "../../../assets/forHerMin.jpg";
// presentational component, decorative two images with text between them
// images have link to ForHim and ForHer pages
const ForThem = () => {
  return (
    <div className="forthem ">
      <NavLink to="/forhim" className="container fade-in-left animated">
        <div className="floating-text ">
          For <br /> him
        </div>
        <img src={forHimImg} className="forthem-img" alt="him" />
      </NavLink>
      <div className="text animated appear">
        100% <br /> COTTON <br />
        clothes <br />
        for
        <br /> him &amp; her
        <br />1 click away
      </div>
      <NavLink to="/forher" className="container fade-in-right animated">
        <div className="floating-text ">
          For <br /> her
        </div>
        <img src={forHerImg} className="forthem-img" alt="him" />
      </NavLink>
    </div>
  );
};

export default ForThem;
