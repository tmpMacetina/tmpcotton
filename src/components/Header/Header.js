/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../../assets/Logo/Logo.png";
// presentational header component that contains navigation, log in/log out changes based on auth
const Header = props => {
  const { auth, logOutHandler } = props;
  return (
    <div className="header">
      <NavLink to="/" className="logo">
        <img src={Logo} alt="logo" className="logo" />
      </NavLink>

      <div className="left">
        <NavLink className="link" activeClassName="active-class" exact to="/">
          Home
        </NavLink>
        <NavLink className="link" activeClassName="active-class" to="/forhim">
          For him
        </NavLink>
        <NavLink className="link" activeClassName="active-class" to="/forher">
          For her
        </NavLink>
      </div>

      <div className="right">
        <NavLink
          className="link"
          activeClassName="active-class"
          to="/allproducts"
        >
          All products
        </NavLink>
        {auth ? (
          <div className="logout" onClick={logOutHandler}>
            Log out
          </div>
        ) : (
          <NavLink className="link" activeClassName="active-class" to="/login">
            Log In
          </NavLink>
        )}
        <NavLink className="link" activeClassName="active-class" to="/cart">
          Cart
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  auth: PropTypes.bool,
  logOutHandler: PropTypes.func.isRequired
};
Header.defaultProps = {
  auth: "false"
};
