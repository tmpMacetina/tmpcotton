/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../../assets/Logo/Logo.png";

const Header = props => {
  const { auth, logOutHandler } = props;
  return (
    <div className="header">
      <div className="header-left">
        <NavLink activeClassName="active-class" exact to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active-class" to="/forhim">
          For him
        </NavLink>
        <NavLink activeClassName="active-class" to="/forher">
          For her
        </NavLink>
      </div>
      <img src={Logo} alt="logo" className="logo" />
      <div className="header-right">
        <NavLink activeClassName="active-class" to="/allproducts">
          All products
        </NavLink>
        {auth ? (
          <div className="logout" onClick={logOutHandler}>
            Log out
          </div>
        ) : (
          <NavLink activeClassName="active-class" to="/login">
            Log In
          </NavLink>
        )}
        <NavLink activeClassName="active-class" to="/cart">
          Cart
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
  logOutHandler: PropTypes.func.isRequired
};
