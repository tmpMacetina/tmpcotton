/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import ReactDOM from "react-dom";

import "./Notification.scss";

const Notification = props => {
  return ReactDOM.createPortal(
    <div className="notification">{props.msg}</div>,
    document.getElementById("notification")
  );
};

export default Notification;
