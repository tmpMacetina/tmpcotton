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
