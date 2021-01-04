/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import "./Backdrop.scss";
import PropTypes from "prop-types";

const Backdrop = props => {
  const { onclick } = props;
  return <div className="backdrop" onClick={onclick} />;
};

export default Backdrop;

Backdrop.propTypes = {
  onclick: PropTypes.func.isRequired
};
