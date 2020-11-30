import React from "react";
import "./ForThem.scss";
import { NavLink } from "react-router-dom";
import forHimImg from "../../assets/forHimMin.jpg";
import forHerImg from "../../assets/forHerMin.jpg";

const ForHimHer = () => {
  return (
    <div className="forthem ">
      <NavLink to="forhim" className="container fadeInLeft animated">
        <div className="floating-text ">
          For <br /> him
        </div>
        <img src={forHimImg} className="forthem-img" alt="him" />
      </NavLink>
      <div className="forthem-text">
        100% <br /> COTTON <br />
        clothes <br />
        for
        <br /> him &amp; her
      </div>
      <NavLink to="forher" className="container fadeInRight animated">
        <div className="floating-text ">
          For <br /> her
        </div>
        <img src={forHerImg} className="forthem-img" alt="him" />
      </NavLink>
    </div>
  );
};

export default ForHimHer;
